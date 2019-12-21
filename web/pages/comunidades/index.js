
import Layout from '../../components/Layout';
import Header from '../../components/Header';

import Footer from '../../components/Footer';
import React from 'react';
import { Row, Col, Container, Button, Card, CardBody, CardImg, CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Space from '../../components/Space';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import appFetch from '../../utils/appFetch'
import { signIn } from '../../actionCreators'
import { toast } from 'react-toastify';
import { Link } from '../../routes'


class Courses extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      communities: props.communities,
      isDeleteModalOpen: null
    }
  }

  static async getInitialProps(ctx) {
    // const { token } = validateUser(ctx, ADD_LOCATION_PERMISSION)
    try {
      const response = await appFetch("/api/communities/", {
        method: 'GET',
      })
      if (response.communities) {
        return { communities: response.communities }
      }
    } catch (err) {
      console.log(err)
    }
    return { communities: [] }
  }

  async componentDidMount() {
    // try {
    //   const response = await appFetch("/api/communities/", {
    //     method: 'GET',
    //   })
    //   if (response.communities) {
    //     this.setState({ communities: response.communities })
    //   }
    // } catch (err) {
    //   console.log(err)
    // }
  }

  toggleDeleteModal = (id) => {
    this.setState({ isDeleteModalOpen: id ? id : null })
  }

  remove() {
    let communityId = this.state.isDeleteModalOpen
    appFetch(`/api/communities/${communityId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }

    }).then(response => {
      if (!response.error) {
        let communities = this.state.communities.filter(elem => elem.id !== communityId)
        this.setState({ communities })
        toast.success("Se ha elminado correctamente")
      } else {
        toast.error("Se ha producido un error")
      }

      console.log(response, communityId)

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
                  Comunidades
                    </h2>

              </div>
            </Col>
            <Col xs="12">
              <Space size="md" />
            </Col>
            <Col xs="12">
              <Link href="/comunidades/nuevo">
                <a className='btn btn-secondary float-right'>
                  Nuevo comunidad
                            </a>
              </Link>


            </Col>
            <Col xs="12">
              <Space size="md" />
            </Col>




            {this.state.communities.map(elem => <Col lg="4" md="6" key={elem.id}> <Card>
              <CardImg top height="180px" style={{objectFit: "cover"}} src={elem.image} alt="Card image cap" />
              <CardBody>
                <CardTitle className="text-right">
                  <Link href={`/comunidades/nuevo?id=${elem.id}`}><a className="text-uppercase">Editar </a></Link>
                  <a href="#" onClick={this.toggleDeleteModal.bind(this, elem.id)} style={{ marginLeft: 16 }} className="text-uppercase">Eliminar </a>
                </CardTitle>
                <CardTitle><h5>{elem.name}</h5></CardTitle>
                {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                <CardText>{elem.description}</CardText>
                <Row>
                  <Col className="text-right">
                    <Link route='oneCommunity' params={{ communityId: elem.id.toString() }} ><Button className="text-right">Abrir</Button></Link>

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
              ¿Estas seguro que deseas eliminar la comunidad?
                  </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleDeleteModal.bind(this, null)}>Cancelar</Button>{' '}
              <Button color="danger" onClick={this.remove.bind(this)}>Eliminar</Button>

            </ModalFooter>
          </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
