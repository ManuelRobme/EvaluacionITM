import Link from 'next/link'
import withLayout from '../../components/Layout';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import React from 'react';
import { Row, Col, Container, Collapse, Input, Label, FormGroup } from 'reactstrap'
import Space from '../../components/Space';
import FormInput from '../../components/FormInput';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import appFetch from '../../utils/appFetch'
import { Router } from '../../routes'
import cookies from 'next-cookies'
import fetch from 'isomorphic-unfetch';
import { toast, ToastContainer } from 'react-toastify';
import appRedirect from '../../utils/appRedirect';

class NuevoComunidad extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            name: "",
            fatherLastName: "",
            motherLastName: "",
            errors: {},
            ...props.teacher
        }
    }

    static async getInitialProps(ctx) {
        const { query } = ctx;
        // const { token } = validateUser(ctx, ADD_LOCATION_PERMISSION)

        if (query.id) {
            try {
                const response = await appFetch(`/api/teachers/${query.id}`, {
                    // token,
                    method: 'GET',
                })
                if (response.teacher) {
                    return { id: query.id, teacher: response.teacher }
                } else {
                    return appRedirect(ctx, '/404')
                }
            } catch (err) {
                console.log(err)
                return appRedirect(ctx, '/404')

            }
        } else {
            return { ...query }
        }
    }

    setValue = (name, ev) => {
        this.setState({ [name]: ev.target.value })
    }

    setNumberValue = (name, ev) => {
        this.setState({ [name]: Number(ev.target.value) })
    }

    upload = (ev) => {
        ev.preventDefault();
        const { name, fatherLastName, motherLastName } = this.state
        const { id } = this.props

        if (!this.validate()) return;

        var formData = new FormData();

        formData.append("name", name);
        formData.append("fatherLastName", fatherLastName);
        formData.append("motherLastName", motherLastName);


        appFetch(`/api/teachers/${id ? id : ""}`, {
            method: id ? 'PUT' : 'POST',
            body: formData
        }).then(response => {
            console.log(response)
            if (!response.error) {
                Router.pushRoute("teachers")
            } else {
                this.validate(response.error);
            }

        }).catch(error => {
            toast.error("Se produjo un error de conexión, verifique su conexión a internet.", "error")
            console.log(error)



        });
    }

    validate = (error) => {
        let errors = {}
        const { name, fatherLastName, motherLastName } = this.state

        if (!name.trim() || (error && error.code === 101)) {
            errors.name = "Ingrese un nombre valido"
        }

        if (!fatherLastName.trim() || (error && error.code === 102)) {
            errors.fatherLastName = "Ingrese un apellido paterno"
        }

        if (!motherLastName.trim() || (error && error.code === 102)) {
            errors.motherLastName = "Ingrese un apellido materno"
        }

        if (error && (error.code < 101 || error.code > 106)) {
            toast.error(error.message)
        }

        this.setState({ errors })
        return Object.keys(errors).length === 0 && !error;

    }




    render() {
        return (
            <Layout {...this.props}>
                <Header noBackground />
                <Container>
                    <ToastContainer />
                    <Row className="justify-content-center">

                        <Col xs="12" className="mx-auto">

                            <div className="section-name text-center">
                                <Space size="md" />
                                <h2 className="lg-font-size font-weight__700 text-black">
                                    Nuevo maestro
                                </h2>

                            </div>
                            <Space size="md" />
                        </Col>
                    </Row>


                    <Row>
                        <Col xs="12" md="6">
                            <FormInput value={this.state.name} error={this.state.errors["name"]} className="input-box" name="name" type="text" label="Nombre" onChange={this.setValue} />
                        </Col>
                        <Col xs="12" md="6">
                            <FormInput value={this.state.fatherLastName} error={this.state.errors["fatherLastName"]} className="input-box" name="fatherLastName" type="text" label="Apellido Paterno" onChange={this.setValue} />
                        </Col>
                        <Col xs="12" md="6">
                            <FormInput value={this.state.motherLastName} error={this.state.errors["motherLastName"]} className="input-box" name="motherLastName" type="text" label="Apellido Materno" onChange={this.setValue} />
                        </Col>



                        <Col xs="12">
                            <a className='btn btn-secondary float-right' href="#" onClick={this.upload}>
                                Guardar y agregar
                            </a>

                        </Col>
                        <Col>
                            <Space size="lg" />
                        </Col>

                    </Row>


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
        dispatch

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NuevoComunidad)
