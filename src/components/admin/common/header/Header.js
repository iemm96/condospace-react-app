import React, {useEffect, useState} from 'react';
import {Button, Collapse, Navbar, NavLink, UncontrolledDropdown} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import SideBar from "../SideBar";
import CookieService from "../../../../services/CookieService";
import {useUsuario} from "../../../../context/usuario-context";
import {useLocation} from "react-router-dom";
import './header.scss';

export const AdminHeader = (props) => {
    const [isOpenSidebar,setIsOpenSidebar] = useState(null);
    const { usuario,tema } = useUsuario();
    const [titleSection,setTitleSection] = useState(false);
    let location = useLocation();
    let arrUrl = location.pathname.split('/');
    let secondPath = arrUrl[2];

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
        <Navbar className={'header-dashboard navbar navbar-expand-xl animate fadeInDown one navbar-light top-navbar '  + tema}
                data-toggle="sticky-onscroll">
            <div className="container">
                <Button color="info" className="" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars}/>
                </Button>
                <NavLink className="navbar-brand" to="#">CondoSpace</NavLink>

                <Collapse className="navbar-collapse justify-content-start" id="navbarSupportedContent" navbar>

                    <ul className="navbar-nav">


                    </ul>
                    <UncontrolledDropdown className="d-sm-none">
                        <img src={require('../../../../assets/images.png')} width={35} height={35} className="rounded-circle"/>
                        <DropdownToggle caret>
                            Admin
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Mis datos de perfil</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={cerrarSesion}>Cerrar Sesión</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Collapse>
                <UncontrolledDropdown className="d-none d-sm-block">
                    <img src={require('../../../../assets/images.png')} width={35} height={35} className="rounded-circle"/>
                    <DropdownToggle caret>
                        Admin
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

