import Link from 'next/link'
import withLayout from '../components/Layout';
import Layout from '../components/Layout';
import Header from '../components/Header';

import SectionJumbotron from '../components/SectionJumbotron';
import SectionCards from '../components/SectionsCards';
import SectionKeyFeatures from '../components/SectionsKeyFeatures';
import Footer from '../components/Footer';
import React from 'react';
import {Row, Col, Container, Form, FormGroup, Input, Label, Button} from 'reactstrap'
import Space from '../components/Space';
import FormInput from '../components/FormInput';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import appFetch from '../utils/appFetch'
import {signIn} from '../actionCreators'
import redirect from 'next-redirect'
import Router from 'next/router'
import cookies from 'next-cookies'
import { toast} from 'react-toastify';


class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  static async getInitialProps (ctx) {
    
    const { token } = cookies(ctx)
    console.log(token)
    
    return {}
 
  }

  setValue = (name, ev) => {
    
    this.setState({[name]: ev.target.value})
    
  }

  login = (ev)=> {
    console.log(`Login ${this.state.email} ${this.state.password}`)
    const { email, password } = this.state
    console.log(this.props.dispatch)
    appFetch("/api/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(response => {
      console.log(response)
      if (!response.error) {

        this.props.signIn(response)
        Router.push("/encuesta")

      } else {
        console.log("Contraseña o user incorrectos")
        toast.error("Contraseña o email incorrecto.", "error")
      }

      console.log(response)

    }).catch(error => {
      toast.error("Se produjo un error de conexión, verifique su conexión a internet.", "error")
      console.log(error)

    });
  }

  render() {
    return (
      <Layout>
        <Header noBackground/>
        <Container className="section">
            <Row noGutters>
                <Col className="mx-auto">
                    <Row>
                        <Col xs="10" className="mx-auto">
                            <div className="section-title text-center">
                                <h2 className="lg-font-size font-weight__700 text-black">
                                    Iniciar sesión
                                </h2>
                                
                                
                            </div>
                            <Space size="md"/>
                        </Col>
                        <Col xs="12">
                          <Form>
                            <Row>
                              <Col xs="10" md="8" lg="5" className="mx-auto">
                                <FormInput name="email" type="email" placeholder="Ingrese un correo electrónico" onChange={this.setValue} label="Correo electrónico" />

                              </Col>
                            </Row>
                            <Row>
                              <Col xs="10" md="8" lg="5" className="mx-auto">
                                <FormInput name="password" type="password" placeholder="Ingrese una contraseña" onChange={this.setValue} label="Contraseña" />
                              </Col>
                            </Row>
                            <Space size="sm"/>
                            <Row>
                              <Col xs="10" md="8" lg="2" className="mx-auto">
                                <Button block color="primary" onClick={this.login}>Iniciar sesión</Button>
                              </Col>
                            </Row>
                          </Form>
                      </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        
        <Footer/>
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch, 
    ...bindActionCreators({ signIn }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
