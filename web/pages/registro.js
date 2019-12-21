import { Component } from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FormInput from '../components/FormInput'
import { Container, Row, Col, Form, Button } from 'reactstrap'
import { toast } from 'react-toastify'
import appFetch from '../utils/appFetch'

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      fatherLastName: '',
      motherLastName: '',
      birthDate: '',
      errors: {}
    }
  }

  signup = ev => {
    ev.preventDefault()

    if (!this.validate()) return

    appFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      console.log(res)
      if (!res.error) {
        toast.success("Registro completado correctamente")
      }
    }).catch(err => {
      console.log(err)
      toast.error("Ocurrio un error, revise su informacion e intentelo de nuevo")
    })
  }

  validate = () => {
    let errors = {}
    const { name, email, fatherLastName, motherLastName, password, confirmPassword, birthDate } = this.state

    if (!name.trim()) {
      errors.name = "Ingrese su nombre"
    }
    if (!fatherLastName.trim()) {
      errors.fatherLastName = "Ingrese su apellido paterno"
    }
    if (!motherLastName.trim()) {
      errors.motherLastName = "Ingrese su apellido materno"
    }
    if (!email) {
      errors.email = "Ingrese un correo valido"
    }
    if (!password.trim() && password.length < 6) {
      errors.password = "Ingrese una contraseña mayor a 6 caracteres"
    }
    if (password != confirmPassword) {
      errors.confirmPassword = "Las contraseñas deben coincidir"
    }
    if (!birthDate) {
      errors.birthDate = "Ingrese su fecha de nacimiento"
    }

    this.setState({ errors })
    return Object.keys(errors).length === 0
  }

  setValue = (name, ev) => this.setState({ [name]: ev.target.value })


  render() {
    return <Layout>
      <Header noBackground />
      <Container>
        <Row>
          <Col xs='12' lg="8" className="mx-auto">
            <Form onSubmit={this.signup}>
              <Row>
                <Col md='10' className="mx-auto">
                  <FormInput
                    name="name"
                    type="text"
                    placeholder="Ingrese su nombre(s)"
                    onChange={this.setValue}
                    label="Nombre(s)"
                    error={this.state.errors.name} />

                  <FormInput
                    name="fatherLastName"
                    type="text"
                    placeholder="Ingrese su Apellido Paterno"
                    onChange={this.setValue}
                    label="Apellido Paterno"
                    error={this.state.errors.fatherLastName} />

                  <FormInput
                    name="motherLastName"
                    type="text"
                    placeholder="Ingrese su Apellido Materno"
                    onChange={this.setValue}
                    label="Apellido Materno"
                    error={this.state.errors.motherLastName} />

                  <FormInput
                    name="email"
                    type="email"
                    placeholder="Ingrese un correo electrónico"
                    onChange={this.setValue}
                    label="Correo electrónico"
                    error={this.state.errors.email} />

                  <FormInput
                    name="password"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    onChange={this.setValue}
                    label="Contraseña"
                    error={this.state.errors.password} />

                  <FormInput
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirme su contraseña"
                    onChange={this.setValue}
                    label="Confirmar Contraseña"
                    error={this.state.errors.confirmPassword} />

                  <FormInput
                    name="birthDate"
                    type="date"
                    onChange={this.setValue}
                    label="Fecha de Nacimiento"
                    error={this.state.errors.birthDate} />

                  <Row>
                    <Col className="text-center">
                      <Button type="submit">Registrarme</Button>
                    </Col>
                  </Row>
                </Col>
              </Row>

            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Layout>
  }
}

export default SignUp