import {Row, Container, Col, Jumbotron, Collapse, Nav, NavItem, NavLink} from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'



const SectionJumbotron = (props) => 
    <section>
        <Jumbotron className="hero jumbotron-fluid bg-transparent mb-0">
            <Container className="hero-inner">
                <Row className="row no-gutters align-items-center">
                    <Col lg="10" className="mx-auto">
                        <Row className="align-items-center">
                            <Col>
                                <div className="text-center">
                                    <h1 className="xxl-font-size font-weight__700 text-white">
                                        {props.count}
                                    </h1>
                                </div>
                                <div className="sm-space"></div>
                                <div className="text-center">
                                    <p className="base-plus-font-size text-white">
                                        Praesent mollis, massa in auctor molestie, magna lorem semper mauris a venenatis turpis.
                                    </p>
                                </div>
                                <div className="lg-space"></div>
                                <div className="text-center">
                                    <a href="#" onClick={props.incrementCount} className="btn btn-lg btn-rounded base-font-size font-weight__700 pl-4 pr-4 btn-shadow btn-lift-up bg-white"><img src="static/images/chrome.svg" alt="chrome logo" className="icon mr-3"/> Empezar ahora</a>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    </section>

function mapStateToProps (state) {
  
    return {  }
  }
  const mapDispatchToProps = dispatch => bindActionCreators({  }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(SectionJumbotron)