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

            fileMessage: "Ningún archivo seleccionado",
            name: "",
            description: "",
            file: null,
            errors: {},
            ...props.community
        }
    }

    static async getInitialProps(ctx) {
        const { query } = ctx;
        // const { token } = validateUser(ctx, ADD_LOCATION_PERMISSION)

        if (query.id) {
            try {
                const response = await appFetch(`/api/communities/${query.id}`, {
                    // token,
                    method: 'GET',
                })
                if (response.community) {
                    return { id: query.id, community: response.community }
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

    setFileValue = (ev) => {
        let file = ev.target.files[0];
        this.setState({
            file,
            fileMessage: (file ? file.name : "Ningún archivo seleccionado")
        })
    }

    upload = (ev) => {
        ev.preventDefault();
        const { name, description, file } = this.state
        const { id } = this.props

        if (!this.validate()) return;

        var formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", file);


        appFetch(`/api/communities/${id ? id : ""}`, {
            method: id ? 'PUT' : 'POST',
            body: formData
        }).then(response => {
            console.log(response)
            if (!response.error) {

                if (this.props.admin) {
                    Router.push("/admin/comunidades")
                } else {
                    Router.pushRoute("communities")
                }

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
        const { name, description } = this.state

        if (!name.trim() || (error && error.code === 101)) {
            errors.name = "Ingrese un título valido"
        }

        if (!description.trim() || (error && error.code === 102)) {
            errors.description = "Ingrese una descripción"
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
                                    Nuevo comunidad
                                </h2>

                            </div>
                            <Space size="md" />
                        </Col>
                    </Row>


                    <Row>
                        <Col xs="12" md="6">
                            <FormInput value={this.state.name} error={this.state.errors["name"]} className="input-box" name="name" type="text" label="Titulo" onChange={this.setValue} />
                        </Col>
                        <Col xs="12" md="6">

                            {/* <label> Imagen de portada </label>
                            <input type='file' name='foto_portada' id='archivo' className='campo-archivo' data-multiple-caption="{count} files selected" accept="image/x-png,image/gif,image/jpeg" required />
                            <label for='archivo'>
                                <span className='mensaje'> Ningún archivo seleccionado </span>
                                <span className='seleccionar'> Seleccionar </span>
                            </label> */}
                            <FormGroup>
                                <Label style={{ display: "block" }}>Imagen de portada</Label>
                                <Input type="file" id="archivo" style={{ display: "none" }} onChange={this.setFileValue}></Input>
                                <Label htmlFor='archivo' style={{ display: "block" }} className="input-box" >

                                    <span style={{ padding: 6, position: "absolute", marginLeft: 8 }}> {this.state.fileMessage} </span>

                                    <a className="btn btn-secondary text-white" style={{ position: "absolute", right: 0, marginRight: 16 }} htmlFor='archivo' > Seleccionar </a>



                                </Label>
                            </FormGroup>
                        </Col>


                        <Col xs="12">
                            {/* <label>Descripción corta</label>
                            <textarea name='descripcion_corta' placeholder='Procura escribir un solo párrafo. Sé contreto (a).' required></textarea> */}
                            <FormInput value={this.state.description} error={this.state.errors["description"]} className="input-box" name="description" type="textarea" label="Descripción" onChange={this.setValue} placeholder="Procura escribir un solo párrafo. Sé contreto (a)." />
                        </Col>





                        <Col xs="12">
                            <a className='btn btn-secondary float-right' href="#" onClick={this.upload}>
                                Guardar y publicar
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
