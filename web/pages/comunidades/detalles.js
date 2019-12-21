
import withLayout from '../../components/Layout';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import classnames from 'classnames';
import Footer from '../../components/Footer';
import React from 'react';
import { TabContent, TabPane, Badge, Row, Col, Container, Button, Card, CardBody, CardImg, CardTitle, CardText, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Space from '../../components/Space';
import FormInput from '../../components/FormInput';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { incrementCount } from '../../store'
import appFetch from '../../utils/appFetch'
import { signIn } from '../../actionCreators'
import redirect from 'next-redirect'
import Router from 'next/router'
import cookies from 'next-cookies'
import { toast } from 'react-toastify';
import { Link } from '../../routes'
import appRedirect from '../../utils/appRedirect';
import moment from 'moment'
import 'moment/locale/es';

class Community extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      community: props.community,
      activeTab: '1',
      isDeleteUserModalOpen: null

    }
  }

  toggle(tab, ev) {
    ev.preventDefault()
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  static async getInitialProps(ctx) {
    const { token } = cookies(ctx)

    try {
      const response = await appFetch(`/api/communities/${ctx.query.communityId}/`, {
        token,
        method: 'GET',
      })
      // console.log(response)
      if (!response.error) {
        if (!response.community) {
          return appRedirect(ctx, '/404')
        }
        return { community: response.community, ...ctx.query }
      }
    } catch (err) {
      console.log(err)
    }
    return appRedirect(ctx, '/404')
  }

  toggleUserDeleteModal = (id, ev) => {
    ev.stopPropagation()
    this.setState({ isDeleteUserModalOpen: id ? id : null })
  }

  removeUser() {
    let userCommunityId = this.state.isDeleteUserModalOpen
    appFetch(`/api/communities/${userCommunityId}/user`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }

    }).then(response => {
      console.log(response)
      if (!response.error) {
        let community = this.state.community
        community.users = community.users.filter(elem => elem.userCommunity.id !== userCommunityId)
        this.setState({ community })
        toast.success("Se ha elminado correctamente")
      } else {
        toast.error("Se ha producido un error")
      }


    }).catch(error => {
      toast.error("Se produjo un error de conexión, verifique su conexión a internet.", "error")
    });

    this.setState({ isDeleteUserModalOpen: null })

  }


  render() {
    return (
      <Layout>
        <Header noBackground />
        <Container>
          <Row className="justify-content-center">

            <Col xs="12" className="mx-auto">
              <Space size="sm" />
              <Row>

                <Col xs="12" md="4">
                  <img top width="100%" src={this.state.community.image} alt="Image cap" style={{ borderRadius: 8 }} />
                </Col>

                <Col xs="12" md="8">
                  <Row>
                    <Col>
                      <div className="text-center">
                        <Space size="md" />
                        <h2>
                          {this.state.community.name}
                        </h2>
                        <p>
                          {this.state.community.description}
                        </p>

                      </div>

                    </Col>


                  </Row>


                </Col>
              </Row>
              <Space size="sm" />
            </Col>
            <Col>

              {/* 
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    Publicaciones
            </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    Reportes
            </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}
                  >
                    Miembros
            </NavLink>
                </NavItem>


              </Nav>  */}
              <Row>
                <Col xs="12" lg="4" style={{ marginTop: 90 }}>

                  <Card>

                    <CardBody>

                      <CardTitle><h5>Menu</h5></CardTitle>
                      {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                      <ListGroup flush>
                        <ListGroupItem disabled={this.state.activeTab === "1"} onClick={this.toggle.bind(this, "1")} tag="a" href="#">Publicaciones <Badge pill>{this.state.community.posts.length}</Badge></ListGroupItem>
                        <ListGroupItem disabled={this.state.activeTab === "2"} onClick={this.toggle.bind(this, "2")} tag="a" href="#"> Reportes <Badge pill>{this.state.community.reports.length}</Badge></ListGroupItem>
                        <ListGroupItem disabled={this.state.activeTab === "3"} onClick={this.toggle.bind(this, "3")} tag="a" href="#">Miembros <Badge pill>{this.state.community.users.length}</Badge></ListGroupItem>
                      </ListGroup>

                    </CardBody>
                  </Card>

                </Col>
                <Col xs="12" lg="8" style={{ marginTop: 20 }}>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col>
                          <h3>Publicaciones</h3>
                        </Col>
                        <Col xs="6">
                          <Link route="addPost" params={{ communityId: this.props.communityId }}>
                            <a className='btn btn-secondary float-right'>
                              Nueva publicación
                        </a>
                          </Link>

                        </Col>

                        <Col xs="12">
                          <Row>
                            {this.state.community.posts.map(elem => <Col style={{ marginTop: 32 }} sm="12" lg="12" key={elem.id}> <Card>

                              <CardBody>

                                <CardTitle className="text-right">
                                </CardTitle>
                                <Row>
                                  <Col xs="1">
                                    <img src="https://www.uic.mx/posgrados/files/2018/05/default-user.png" width="60" />
                                  </Col>
                                  <Col>
                                    <span style={{ marginLeft: 16, fontWeight: 700, fontSize: 18 }} >{elem.user.name} {elem.user.lastName}</span>
                                    <p style={{ marginLeft: 16 }}> {moment(elem.createdAt).fromNow()} </p>
                                  </Col>
                                  <Col xs="2">
                                    <Link route="addPost" params={{ communityId: this.props.communityId, id: elem.id.toString() }}><a className="text-uppercase">Editar </a></Link>
                                    {/* <a href="#" onClick={this.toggleUserDeleteModal.bind(this, elem.id)} style={{ marginLeft: 16 }} className="text-uppercase">Eliminar </a> */}

                                  </Col>
                                </Row>




                                <CardTitle style={{ marginTop: 16 }}><h5 style={{ fontWeight: 500 }}>{elem.title}</h5></CardTitle>
                                {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                <CardText>{elem.description}</CardText>
                                <Row>
                                  <Col className="text-right">
                                    <Link route='onePost' params={{ communityId: elem.communityId.toString(), postId: elem.id.toString() }} ><Button className="text-right">Abrir</Button></Link>

                                  </Col>
                                </Row>

                              </CardBody>
                            </Card>  </Col>)}
                          </Row>
                        </Col>
                      </Row>

                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col>
                          <h3>Reportes</h3>
                        </Col>
                        <Col xs="6">
                          <Link route="addReport" params={{ communityId: this.props.communityId }}>
                            <a className='btn btn-secondary float-right'>
                              Nuevo reporte
                        </a>
                          </Link>

                        </Col>

                        <Col xs="12">
                          <Row>
                            {this.state.community.reports.map(elem => <Col style={{ marginTop: 32 }} sm="12" lg="12" key={elem.id}> <Card>

                              <CardBody>

                                <CardTitle className="text-right">
                                </CardTitle>
                                <Row>
                                  <Col xs="1">
                                    <img src="https://www.uic.mx/posgrados/files/2018/05/default-user.png" width="60" />
                                  </Col>
                                  <Col>
                                    <span style={{ marginLeft: 16, fontWeight: 700, fontSize: 18 }} >{elem.user.name} {elem.user.lastName}</span>
                                    <p style={{ marginLeft: 16 }}> {moment(elem.createdAt).fromNow()} </p>
                                  </Col>
                                  <Col xs="2">
                                    <Link route="addReport" params={{ communityId: this.props.communityId, id: elem.id.toString() }}><a className="text-uppercase">Editar </a></Link>
                                    {/* <a href="#" onClick={this.toggleUserDeleteModal.bind(this, elem.id)} style={{ marginLeft: 16 }} className="text-uppercase">Eliminar </a> */}

                                  </Col>
                                </Row>




                                <CardTitle style={{ marginTop: 16 }}>
                                  <h5 style={{ fontWeight: 500, display: "inline" }}>{elem.title}</h5>
                                  <Badge color="primary" style={{marginLeft: 16}} pill>{elem.reportType.name}</Badge>
                                </CardTitle>
                                {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                <CardText>{elem.description}</CardText>
                                <Row>
                                  <Col className="text-right">
                                    <Link route='oneReport' params={{ communityId: elem.communityId.toString(), reportId: elem.id.toString() }} ><Button className="text-right">Abrir</Button></Link>

                                  </Col>
                                </Row>

                              </CardBody>
                            </Card>  </Col>)}
                          </Row>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">

                      {this.state.community.users.map(elem => <Col lg="6" md="12" key={elem.id} style={{ marginTop: 70 }}> <Card>
                        {/* <CardImg top width="100%" src={elem.fotoPerfil} alt="Card image cap" /> */}
                        <CardBody>
                          <Row>
                            <Col xs="3">
                              <img src="https://www.uic.mx/posgrados/files/2018/05/default-user.png" width="60" />
                              {/* <CardImg top width="100%" src={elem.fotoPerfil} alt="Card image cap" /> */}

                            </Col>
                            <Col xs="9">

                              <CardTitle className="text-right">
                                <a href="#" onClick={this.toggleUserDeleteModal.bind(this, elem.userCommunity.id)} style={{ marginLeft: 16 }} className="text-uppercase">Eliminar </a>
                              </CardTitle>
                              <CardTitle><h5>{elem.name} {elem.lastName} </h5></CardTitle>
                              {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                              <CardText>{elem.description}</CardText>
                              {/* <Row>
                      <Col className="text-right">
                        <Link route='users' params={{ userId: elem.id.toString() }} ><Button className="text-right">Abrir</Button></Link>

                      </Col>
                    </Row> */}
                            </Col>
                          </Row>

                        </CardBody>
                      </Card>  </Col>)}
                    </TabPane>


                  </TabContent>
                </Col>


              </Row>

            </Col>








          </Row>
          <Space size="lg" />


          <Modal isOpen={this.state.isDeleteUserModalOpen !== null} toggle={this.toggleUserDeleteModal.bind(this, null)}
            className={'modal-danger '}>
            <ModalHeader toggle={this.toggleUserDeleteModal.bind(this, null)}>Confirmación</ModalHeader>
            <ModalBody>
              ¿Estas seguro que deseas eliminar el usuario?
                  </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleUserDeleteModal.bind(this, null)}>Cancelar</Button>{' '}
              <Button color="danger" onClick={this.removeUser.bind(this)}>Eliminar</Button>

            </ModalFooter>
          </Modal>
        </Container>

        <Footer />
      </Layout>
    )
  }
}

function mapStateToProps(state, ownProps) {

  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({ signIn }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Community)
