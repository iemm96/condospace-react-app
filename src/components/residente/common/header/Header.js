import React, {useState,useEffect} from 'react';
import {Button, Collapse, Navbar, NavLink, UncontrolledDropdown} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import CookieService from "../../../../services/CookieService";
import SideBar from "./../SideBar";
import {Link, useLocation} from 'react-router-dom';
import './header.scss';
import {useUsuario} from "../../../../context/usuario-context";

const Header = (props) => {
    const { usuario,tema } = useUsuario();
    const [isOpenSidebar,setIsOpenSidebar] = useState(false);
    const [titleSection,setTitleSection] = useState(false);
    const [tipoUsuario,setTipoUsuario] = useState(false);
    let location = useLocation();
    let arrUrl = location.pathname.split('/');
    let firstPath = arrUrl[1];
    let secondPath = arrUrl[2];
    let thirdPath = arrUrl[3];

    useEffect(() => {

        secondPath = secondPath.charAt(0).toUpperCase() + secondPath.slice(1);
        thirdPath = thirdPath.charAt(0).toUpperCase() + thirdPath.slice(1);

        setTipoUsuario(secondPath);
        setTitleSection(thirdPath);

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

        console.log('cerrar');
        CookieService.remove('access_token');
        CookieService.remove('tipoUsuario');

        window.location.href =  `/${firstPath}/login`;
    };

    const toggleSidebar = () => (setIsOpenSidebar(!isOpenSidebar));

    return(<div className="mt-3">
        <header className="main-header ">
            <SideBar condominio={props.condominio} isOpen={isOpenSidebar}/>

            <Navbar id="user-header" className={'header-dashboard navbar navbar-expand-xl animate fadeInDown one navbar-light top-navbar ' + tema}
                    data-toggle="sticky-onscroll">
                <div className="container">
                    <Button color="info" className="" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars}/>
                    </Button>
                    <NavLink className="navbar-brand"  disabled>CondoSpace</NavLink>

                    <Collapse className="navbar-collapse justify-content-start" id="navbarSupportedContent" navbar>

                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <NavLink className="nav-link" >
                                    {usuario ? <Link style={{color:'white'}} to={`/${arrUrl[1]}/residente/dashboard`}>{usuario.condominio}</Link> : ''}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link">
                                    /
                                </NavLink>
                            </li>
                            <li className="nav-item" >
                                <NavLink className="nav-link" disabled>
                                    {tipoUsuario}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link">
                                    /
                                </NavLink>
                            </li>
                            <li className="nav-item" >
                                <NavLink className="nav-link" disabled>
                                    {titleSection}
                                </NavLink>
                            </li>
                        </ul>
                        <UncontrolledDropdown className="d-sm-none">
                            <img src={usuario.user.fotoPerfil ? usuario.user.fotoPerfil  :  require('./../../../../assets/images.png')} width={35} height={35} className="rounded-circle"/>
                            <DropdownToggle caret>
                                {usuario ? usuario.user.name : ''}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    <Link to={`/${arrUrl[1]}/residente/perfil`}>Mis datos de perfil</Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={cerrarSesion}>Cerrar Sesión</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Collapse>
                    <UncontrolledDropdown className="d-none d-sm-block">
                        <img src={usuario.user.fotoPerfil ? usuario.user.fotoPerfil  :  require('./../../../../assets/images.png')} width={35} height={35} className="rounded-circle"/>
                        <DropdownToggle caret>
                            {usuario ? usuario.user.name : ''}

                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>
                                <Link to={`/${arrUrl[1]}/residente/perfil`}>Mis datos de perfil</Link>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={cerrarSesion}>Cerrar Sesión</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </Navbar>
        </header>
    </div>)
};

export default Header