import { Navbar, Container, NavbarBrand, NavbarToggler, Button, Collapse, Nav, NavItem, NavLink } from 'reactstrap'
const Hero = (props) =>
    <>
        <div>
            <div class="jumbotron jumbotron-fluid bg-transparent hero section">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-12 col-lg-10 col-xl-9 mx-auto">
                            <div class="hero-content text-center">
                                <h1 class="hero-title">Evaluación docente</h1>
                                <div class="space-md"></div>
                                <p class="lead lead-lg">Evalua de manera honesta a los docentes de tu carrera profesional.</p>
                                <div class="space-lg"></div>
                                <a href="/encuesta" class="btn btn-lg btn-primary btn-outline-primary">Comenzar ahora</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
export default Hero