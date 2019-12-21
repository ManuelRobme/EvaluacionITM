import {Row, Col, Container, NavbarToggler, Button, Collapse, Nav, NavItem, NavLink} from 'reactstrap'
import Space from './Space';
const SectionCards = (props) => 

    <section className="section">
        <Container>
            <Row noGutters>
                <Col className="mx-auto">
                    <Row>
                        <Col xs="10" className="mx-auto">
                            <div className="section-title text-center">
                                <h2 className="lg-font-size font-weight__700 text-black">
                                    How it works
                                </h2>
                                <p className="base-plus-font-size">
                                    Praesent mollis, massa in auctor molestie, magna lorem semper mauris a venenatis turpis.
                                </p>
                            </div>
                            <div className="md-space"></div>
                        </Col>
                        <Col xs="12">
                            <Row className="equal-height">
                                <Col xs="12" lg="4" className="border border-right-0 rounded-left border-color-secondary p-5 feature__box my-2">
                                    <div className="text-center text-lg-left">
                                        <img src="static/images/1.svg" className="icon" alt="how it works icon"/>
                                        <Space size="sm" />
                                        <h3 className="base-plus-font-size font-weight__700 text-black mb-0">
                                            Lorem ipsum
                                        </h3>
                                        <Space size="sm" />
                                        <p className="base-font-size">
                                            Praesent mollis, massa in auctor molestie, magna lorem semper mauris a venenatis turpis.
                                        </p>
                                        <Space size="sm" />
                                        <div className="text-center text-lg-right xs-font-size">
                                            <a href="#" className="text-uppercase text-dark-gray">See More <i className="far fa-arrow-alt-circle-right"></i></a>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs="12" lg="4" className="border rounded-0 rounded-left border-color-secondary p-5 feature__box my-2">
                                    <div className="text-center text-lg-left">
                                        <img src="static/images/2.svg" className="icon" alt="how it works icon"/>
                                        <Space size="sm" />
                                        <h3 className="base-plus-font-size font-weight__700 text-black mb-0">
                                            Lorem ipsum
                                        </h3>
                                        <Space size="sm" />
                                        <p className="base-font-size">
                                            Praesent mollis, massa in auctor molestie, magna lorem semper mauris a venenatis turpis.
                                        </p>
                                        <Space size="sm" />
                                        <div className="text-center text-lg-right xs-font-size">
                                            <a href="#" className="text-uppercase text-dark-gray">See More <i className="far fa-arrow-alt-circle-right"></i></a>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs="12" lg="4" className="border border-left-0 rounded-right border-color-secondary p-5 feature__box my-2">
                                    <div className="text-center text-lg-left">
                                        <img src="static/images/3.svg" className="icon" alt="how it works icon"/>
                                        <Space size="sm" />
                                        <h3 className="base-plus-font-size font-weight__700 text-black mb-0">
                                            Lorem ipsum
                                        </h3>
                                        <Space size="sm" />
                                        <p className="base-font-size">
                                            Praesent mollis, massa in auctor molestie, magna lorem semper mauris a venenatis turpis.
                                        </p>
                                        <Space size="sm" />
                                        <div className="text-center text-lg-right xs-font-size">
                                            <a href="#" className="text-uppercase text-dark-gray">See More <i className="far fa-arrow-alt-circle-right"></i></a>
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

export default SectionCards