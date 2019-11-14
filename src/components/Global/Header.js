import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {UncontrolledDropdown} from "reactstrap";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";

class Header extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired
    };

    render() {
        const { children } = this.props;

        return (
            <header className="header">
                <nav className="header-dashboard navbar navbar-expand-lg navbar-light top-navbar  animate fadeInDown one" data-toggle="sticky-onscroll">
                    <div className="container">

                        <a className="navbar-brand" href="#">CondoSpace</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon">i</span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" href="/admin/anuncios">Anuncios</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/admin/finanzas">Finanzas</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/admin/eventos">Eventos</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/admin/areasComunes">Áreas Comunes</a>
                                </li>
                            </ul>
                        </div>
                        <div className="justify-content-end" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <img src={require('../../assets/images.png')} width={35} height={35} className="rounded-circle"/>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                        Nombre del usuario
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Mis datos de perfil</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Cerrar Sesión</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;


