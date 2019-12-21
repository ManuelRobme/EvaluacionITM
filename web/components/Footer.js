import {Navbar, Container, NavbarBrand, NavbarToggler, Button, Collapse, Nav, NavItem, NavLink} from 'reactstrap'
const Footer = (props) => 

    <footer className="footer py-5 bg-white">
        <div className="container">
            <div className="row no-gutters">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <div className="text-center text-lg-left">
                                
                            </div>
                        </div>
                        <div className="col-10 mx-auto col-lg-8">
                            <div className="row">
                                <ul className="nav col flex-column sm-font-size">
                                    <li className="nav-link nav-head text-uppercase font-weight__500 text-black base-font-size font-family-secondary">Company</li>
                                    <li className="nav-item"><a href="#features" className="nav-link text-dark-gray ips">Features</a></li>
                                    <li className="nav-item"><a href="#how-works" className="nav-link text-dark-gray ips">How it works?</a></li>
                                </ul>
                                <ul className="nav col flex-column sm-font-size">
                                    <li className="nav-link nav-head text-uppercase font-weight__500 text-black base-font-size font-family-secondary">Support</li>
                                    <li className="nav-item"><a href="#" className="nav-link text-dark-gray">Help</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link text-dark-gray">FAQ</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link text-dark-gray">Contact</a></li>
                                </ul>
                                <ul className="nav col flex-column sm-font-size">
                                    <li className="nav-link nav-head text-uppercase font-weight__500 text-black base-font-size font-family-secondary">Legal</li>
                                    <li className="nav-item"><a href="#" className="nav-link text-dark-gray">Terms</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link text-dark-gray">Privacy</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link text-dark-gray">Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
export default Footer