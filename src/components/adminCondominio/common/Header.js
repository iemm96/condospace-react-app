import React from 'react';
import {Button, Collapse, Navbar, NavLink, UncontrolledDropdown} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import CookieService from "../../../services/CookieService";

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setActiveTab: 1,
            activeTab: 1,
            dropDownValue: 'Select action',
            dropdownOpen: false,
            modalEvento: false,
            modalAnuncio: false,
            modalFinanzas: false,
            modalAreasComunes:false,
            isOpenSidebar:false
        }
    }

    componentDidMount() {

        let self = this;
        var elements = document.querySelectorAll('[data-toggle="sticky-onscroll"]');
        // Find all data-toggle="sticky-onscroll" elements

        const url = this.props.match.path;


        [].forEach.call(elements, function(element) {

            let div = document.createElement('div');
            div.classList.add('sticky-wrapper');

            var sticky = element;
            var stickyWrapper = div;
            sticky.before(stickyWrapper);
            sticky.classList.add('sticky');

            // Scroll & resize events
            window.addEventListener('scroll', function () {
                self.stickyToggle(sticky, stickyWrapper, window);
            });

            // On page load
            self.stickyToggle(sticky, stickyWrapper, window);
        });

    }

    stickyToggle(sticky, stickyWrapper, scrollElement) {

        var stickyHeight = sticky.offsetHeight;
        var stickyTop = stickyWrapper.offsetTop;

        if (scrollElement.pageYOffset >= stickyTop) {
            sticky.classList.add("is-sticky");

            stickyWrapper.style.height = stickyHeight + 'px';
        } else {
            sticky.classList.remove("is-sticky");
            stickyWrapper.style.height = 'auto';
        }
    };

    toggleSidebar = () => (this.setState({isOpenSidebar:!this.state.isOpenSidebar}));

    cerrarSesion = () => {
        console.log('cerrar');
        CookieService.remove('access_token');
        CookieService.remove('tipoUsuario');

        window.location.href = '/condochido/login';
    }

    render(){
        const { condominio } = this.props.match.params;
        return(
            <div className="mt-3">
                <header className="main-header ">
            <Navbar className="header-dashboard navbar navbar-expand-xl animate fadeInDown one navbar-light top-navbar"
                    data-toggle="sticky-onscroll">
                <div className="container">
                    <Button color="info" className="" onClick={this.toggleSidebar}>
                        <FontAwesomeIcon icon={faBars}/>
                    </Button>
                    <NavLink className="navbar-brand" to="#">CondoSpace</NavLink>

                    <Collapse className="navbar-collapse justify-content-start" id="navbarSupportedContent" navbar>

                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <NavLink className="nav-link" href="/admin/anuncios"
                                         className={this.props.location === 'admin/anuncios' ? 'active' : ''}>{condominio}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" href="/admin/eventos"
                                         className={this.props.location === '/admin/eventos' ? 'active' : ''}>Bienvenida
                                </NavLink>
                            </li>
                        </ul>
                        <UncontrolledDropdown className="d-sm-none">
                            <img src={require('./../../../assets/images.png')} width={35} height={35} className="rounded-circle"/>
                            <DropdownToggle caret>
                                Nombre del usuario
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Mis datos de perfil</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.cerrarSesion}>Cerrar Sesión</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Collapse>
                    <UncontrolledDropdown className="d-none d-sm-block">
                        <img src={require('./../../../assets/images.png')} width={35} height={35} className="rounded-circle"/>
                        <DropdownToggle caret>
                            Nombre del usuario
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Mis datos de perfil</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.cerrarSesion}>Cerrar Sesión</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </Navbar>
        </header>
            </div>
        );
    }
}

