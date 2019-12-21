
import Layout from '../../components/Layout';
import Header from '../../components/Header';

import Footer from '../../components/Footer';
import Dropdown from '../../components/Dropdown';
import React from 'react';
import {
    Row, Col, Container, Button, Card, CardBody, CardImg, CardTitle, CardText,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import Space from '../../components/Space';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import appFetch from '../../utils/appFetch'
import { signIn } from '../../actionCreators'
import { toast } from 'react-toastify';
import { Link } from '../../routes'
import * as Survey from "survey-react";


var surveyJSON = {
    "pages": [{
        "name": "page1", "elements":
            [{ "id": 1, "type": "rating", "name": "El docente asiste todos los dias a clases" },
            { "id": 2, "type": "rating", "name": "El docente abarca todos los temas de la unidad" },
            { "id": 3, "type": "rating", "name": "El docente resuelve todas las dudas del tema abarcado" },
            { "type": "rating", "name": "El docente utiliza diferentes metodos de enseñanza" },
            { "type": "rating", "name": "El docente maneja varios tipos de información" },
            { "type": "rating", "name": "El docente deja tareas relevantes al tema abarcado" },
            { "type": "rating", "name": "El docente revisa todas las tareas" },
            { "type": "rating", "name": "El docente llega a tiempo a clases" },
            { "type": "rating", "name": "El docente deja claro el criterio de evaluacion" },
            { "type": "comment", "name": "Escribe un comentario" }]
    }]
}





class Evaluations extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            teachers: props.teachers,
            isDeleteModalOpen: null
        }
        

    }

    


    static async getInitialProps(ctx) {
        // const { token } = validateUser(ctx, ADD_LOCATION_PERMISSION)
        try {
            const response = await appFetch("/api/teachers/", {
                method: 'GET',
            })
            if (response.teachers) {
                return { teachers: response.teachers }
            }
        } catch (err) {
            console.log(err)
        }
        return { teachers: [] }
    }

    toggleDeleteModal = (id) => {
        this.setState({ isDeleteModalOpen: id ? id : null })
    }




    remove() {
        let teacherId = this.state.isDeleteModalOpen
        appFetch(`/api/teachers/${teacherId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }

        }).then(response => {
            if (!response.error) {
                let teachers = this.state.teachers.filter(elem => elem.id !== teacherId)
                this.setState({ teachers })
                toast.success("Se ha eliminado correctamente")
            } else {
                toast.error("Se ha producido un error")
            }

            console.log(response, teacherId)

        }).catch(error => {
            toast.error("Se produjo un error de conexión, verifique su conexión a internet.", "error")
        });

        this.setState({ isDeleteModalOpen: null })

    }


    render() {
        return (
            <Layout>
                <Header noBackground />
                <Container>
                    <Row className="justify-content-center">
                        <Col xs="12" className="mx-auto">
                            <div className="section-title text-center">
                                <Space size="md" />
                                <h2 className="lg-font-size font-weight__700 text-black">
                                    Maestros
                                </h2>
                            </div>
                        </Col>
                        <Col xs="12">
                            <Space size="md" />
                        </Col>
                        <Col xs="12">
                            <Link href="/encuesta/nuevo">
                                <a className='btn btn-secondary float-right'>
                                    Nuevo maestro
                            </a>
                            </Link>
                        </Col>

                        <Col xs="12">
                            <Space size="md" />
                        </Col>
                        {this.state.teachers.map(elem => <Col lg="4" md="6" key={elem.id}> <Card>
                            <CardImg top height="180px" style={{ objectFit: "contain", paddingTop: "20px", paddingBottom: "0px" }} src={"/static/images/perfil.png"} alt="Card image cap" />
                            <CardBody>
                                <CardTitle className="text-right">
                                    <Link href={`/encuesta/nuevo?id=${elem.id}`}><a className="text-uppercase">Editar </a></Link>
                                    <a href="#" onClick={this.toggleDeleteModal.bind(this, elem.id)} style={{ marginLeft: 16 }} className="text-uppercase">Eliminar </a>
                                </CardTitle>
                                <CardTitle><h5>{elem.name + " " + elem.fatherLastName + " " + elem.motherLastName}</h5></CardTitle>
                                <Row>
                                    <Col className="text-right">
                                    <Dropdown/>
                                    </Col>

                                    <Col className="text-left">
                                        <Link route='oneTeacherStats' params={{ teacherId: elem.id.toString() }} ><Button className="text-left">Estadisticas</Button></Link>
                                    </Col>
                                </Row>

                            </CardBody>
                        </Card>  </Col>)}

                    </Row>
                    <Space size="lg" />
                    <Modal isOpen={this.state.isDeleteModalOpen !== null} toggle={this.toggleDeleteModal.bind(this, null)}
                        className={'modal-danger '}>
                        <ModalHeader toggle={this.toggleDeleteModal.bind(this, null)}>Confirmación</ModalHeader>
                        <ModalBody>
                            ¿Estas seguro que deseas eliminar al maestro?
                  </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleDeleteModal.bind(this, null)}>Cancelar</Button>{' '}
                            <Button color="danger" onClick={this.remove.bind(this)}>Eliminar</Button>

                        </ModalFooter>
                    </Modal>

                    {/*<div id="surveyContainer">
                        <Survey.Survey json={surveyJSON} onComplete={this.sendDataToServer} />
        </div>*/}

                    <Space size="lg" />
                </Container>

                <Footer />
            </Layout>

        )
    }

}

function mapStateToProps(state) {

    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({ signIn }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Evaluations)
