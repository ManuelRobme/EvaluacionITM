import {Row, Col, Container, NavbarToggler, Button, Collapse, Nav, NavItem, NavLink} from 'reactstrap'
import Space from './Space';
const SectionKeyFeatures = (props) => 

    <section id="features" className="fetures section bg-light">
        <Container>
            <Row noGutters>
                <Col>
                    <Row>
                        <Col xs="10" className="mx-auto">
                            <div className="section-title text-center">
                                <h2 className="lg-font-size font-weight__700 text-black">
                                    Features
                                </h2>
                                <p className="base-plus-font-size">
                                    Praesent mollis, massa in auctor molestie, magna lorem semper mauris a venenatis turpis.
                                </p>
                            </div>
                            
                           <Space size="md" />
                           
                        </Col>
                        <Col xs="12">
                            <Row className="align-items-center">
                                <Col lg="4" className="mx-auto">
                                    <Row>
                                        <Col xs="12" md="4" lg="12" className="my-3">
                                            <h3 className="base-plus-font-size font-weight__700 text-black">
                                                <a href="#">Lorem ipsum</a>
                                            </h3>
                                           <Space size="sm" />
                                            <p className="base-font-size">
                                                Praesent mollis, massa in auctor molestie, magna lorem semper mauris a venenatis turpis.
                                            </p>
                                        </Col>
                                        <Col xs="12" md="4" lg="12" className="my-3">
                                            <h3 className="base-plus-font-size font-weight__700 text-black">
                                                <a href="#">Lorem ipsum</a>
                                            </h3>
                                            
                                           <Space size="sm" />
                                            <p className="base-font-size">
                                                Praesent mollis, massa in auctor molestie, magna lorem semper mauris a venenatis turpis.
                                            </p>
                                        </Col>
                                        <Col xs="12" md="4" lg="12" className="my-3">
                                            <h3 className="base-plus-font-size font-weight__700 text-black">
                                                <a href="#">Lorem ipsum</a>
                                            </h3>
                                            
                                           <Space size="sm" />
                                            
                                            <p className="base-font-size">
                                                Praesent mollis, massa in auctor molestie, magna lorem semper mauris a venenatis turpis.
                                            </p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="7">
                                    <div id="features-carousel" className="carousel slide" data-ride="carousel">
                                        <ol className="features-carousel-indicators carousel-indicators">
                                            <li data-target="#features-carousel" data-slide-to="0" className="active rounded-circle border border-color-primary bg-secondary"></li>
                                            <li data-target="#features-carousel" data-slide-to="1" className="rounded-circle border border-color-primary bg-secondary"></li>
                                            <li data-target="#features-carousel" data-slide-to="2" className="rounded-circle border border-color-primary bg-secondary"></li>
                                        </ol>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img className="img-fluid box box-shadow p-0" src="static/images/dashboard.png" alt="First slide"/>
                                            </div>
                                            <div className="carousel-item">
                                                <img className="img-fluid box box-shadow p-0" src="static/images/dashboard.png" alt="First slide"/>
                                            </div>
                                            <div className="carousel-item">
                                                <img className="img-fluid box box-shadow p-0" src="static/images/dashboard.png" alt="First slide"/>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </section>

export default SectionKeyFeatures