import React, {useEffect, useState} from 'react';
import { Collapse, Navbar, NavLink, UncontrolledDropdown} from "reactstrap";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import CookieService from "../../../../services/CookieService";
import './styles.scss';
import {Link,withRouter,useHistory} from "react-router-dom";

const Header = () => {
    let history = useHistory();

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
    },[]);


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

        CookieService.remove('access_token');
        CookieService.remove('tipoUsuario');

        history.push('/admin/login');
    };

    return(
        <div>
            <header className="main-header mt-0 mt-md-4">
                <Navbar className={'header-dashboard navbar navbar-expand-xl animate fadeInDown one navbar-light top-navbar '}
                        data-toggle="sticky-onscroll">
                    <div className="container">
                        <Link to={'/admin/dashboard'}>
                            <NavLink className="navbar-brand" to="#">CondoSpace</NavLink>
                        </Link>
                        <UncontrolledDropdown >
                            <img className="d-none d-sm-block" src={require('../../../../assets/images.png')} width={35} height={35} className="rounded-circle"/>
                            <DropdownToggle caret>
                                Admin
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={cerrarSesion}>Cerrar Sesión</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </Navbar>
            </header>
        </div>
    );
};

export default withRouter(Header);

