import { Navbar, Container, NavbarBrand, NavbarToggler, Button, Collapse, Nav, NavItem, NavLink } from 'reactstrap'
import { signOut } from '../actionCreators'
import { Link } from '../routes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import OnlyVisitor from './HideComponents/OnlyVisitor'
import OnlyUser from './HideComponents/OnlyUser'
const Header = (props) => {

    const signOut = (ev) => {
        ev.preventDefault();
        props.signOut()
        Router.push("/login")
    }
    
    return <div>
        <header class="header">
            <div class="container">
                <nav class="navbar navbar-expand-lg align-content-center px-0">
                    <a class="navbar-brand" href="#"></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-bars"></i>
                    </button>

                    <div class="collapse navbar-collapse" id="menu">
                        <ul class="navbar-nav ml-lg-auto">
                            <li class="nav-item">
                                <Link route="/"><a class="nav-link active">Inicio <span class="sr-only">(actualmente)</span></a></Link>
                            </li>
                            <OnlyVisitor>
                                <li class="nav-item">
                                    <Link route="login"><a class="nav-link text-primary" >Ingresar</a></Link>
                                </li>
                            </OnlyVisitor>
                            <OnlyUser>
                                <li class="nav-item">
                                    <a class="nav-link text-primary" href="#" onClick={signOut}>Cerrar sesión</a>
                                </li>
                            </OnlyUser>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
        {props.children}
    </div>
}

function mapStateToProps(state) {

    return { ...state.app }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({ signOut }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)