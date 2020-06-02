import React, {useEffect, useState} from 'react';
import {Button, Collapse, Navbar, NavLink, UncontrolledDropdown} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import SideBar from "./SideBar";
import CookieService from "../../../services/CookieService";

export const AdminHeader = (props) => {
    const [isOpenSidebar,setIsOpenSidebar] = useState(null);

    useEffect(() => {
        var elements = document.querySelectorAll('[data-toggle="sticky-onscroll"]');

        [].forEach.call(elements, function(element) {

            let div = document.createElement('div');
            div.classList.add('sticky-wrapper');

            var sticky = element;
            var stickyWrapper = div;
            sticky.before(stickyWrapper);
            sticky.classList.add('sticky');

            // Scroll & resize events
            window.addEventListener('scroll', function () {
                stickyToggle(sticky, stickyWrapper, window);
            });

            // On page load
            stickyToggle(sticky, stickyWrapper, window);
        });
    });


    const stickyToggle = (sticky, stickyWrapper, scrollElement) => {

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

    const cerrarSesion = () => {
        console.log('cerrar');
        CookieService.remove('access_token');
        CookieService.remove('tipoUsuario');

        window.location.href = '/admin/login';
    }

    const toggleSidebar = () => (setIsOpenSidebar(!isOpenSidebar));
    
    return(
        <div className="mt-3">
            <SideBar toggle={toggleSidebar} isOpen={isOpenSidebar}/>
            <header className="main-header ">
        <Navbar className="header-dashboard navbar navbar-expand-xl animate fadeInDown one navbar-light top-navbar"
                data-toggle="sticky-onscroll">
            <div className="container">
                <Button color="info" className="" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars}/>
                </Button>
                <NavLink className="navbar-brand" to="#">CondoSpace</NavLink>

                <Collapse className="navbar-collapse justify-content-center" id="navbarSupportedContent" navbar>

                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <NavLink className="nav-link" href="/admin/anuncios"
                                     className={props.location === 'admin/anuncios' ? 'active' : ''}>Anuncios
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" href="/admin/eventos"
                                     className={props.location === '/admin/eventos' ? 'active' : ''}>Eventos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" href="/admin/finanzas"
                                     className={props.location === '/admin/finanzas' ? 'active' : ''}>Finanzas
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" href="/admin/areas"
                                     className={props.location === '/admin/areas' ? 'active' : ''}>Áreas Comunes
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" href="/admin/condominios"
                                     className={props.location === '/admin/condominios' ? 'active' : ''}>Condominios y Unidades
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" href="/admin/personas"
                                     className={props.location === '/admin/personas' ? 'active' : ''}>Usuarios
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
                            <DropdownItem onClick={cerrarSesion}>Cerrar Sesión</DropdownItem>
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
                        <DropdownItem onClick={cerrarSesion}>Cerrar Sesión</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        </Navbar>
    </header>
        </div>
    );
}

