
import Layout from '../../components/Layout';
import Header from '../../components/Header';

import Footer from '../../components/Footer';
import React from 'react';
import { Row, Col, Container} from 'reactstrap'
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



class Quizzes extends React.Component {

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


    sendDataToServer(survey) {
        //send Ajax request to your web server.
        // alert("The results are:" + JSON.stringify(survey.data));

        appFetch('/api/surveys', {
            method: 'POST',
            body: JSON.stringify({
                survey: survey.data
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            console.log(res)
            if (!res.error) {
                toast.success("Encuesta completada")
            }
        }).catch(err => {
            console.log(err)
            toast.error("Ocurrio un error, revise su informacion e intentelo de nuevo")
        })
        // console.log(survey)
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
                                    Evaluación
                                </h2>
                            </div>
                        </Col>
                        <Col xs="12">
                            <Space size="md" />
                        </Col>
                    </Row>
                    <Space size="lg" />
                    <div id="surveyContainer">
                        <Survey.Survey json={surveyJSON} onComplete={this.sendDataToServer} />
                    </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Quizzes)
