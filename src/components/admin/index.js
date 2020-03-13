import React, {useState} from 'react';
import {Row, Col, Button, NavLink, TabContent, TabPane, UncontrolledDropdown, Label, Collapse, NavbarToggler, Navbar} from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import NuevoEvento from "./modals/NuevoEvento";

import AnunciosTable from "./tables/AnunciosTable";
import EventosTable from "./tables/EventosTable";
import FinanzasTable from "./tables/FinanzasTable";
import AreasComunesTable from "./tables/AreasComunesTable";
//import AreasComunesTable from "./tables/AreasComunesTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faBars} from '@fortawesome/free-solid-svg-icons'
import SideBar from "./common/SideBar";


var anuncios = [{
    id: 1,
    titulo: "Cambios en áreas comunes",
    descripcion: "Les informamos que a partir del día...",
    visible: "Todos",
}, {
    id: 2,
    titulo: "Aumento de cuota de mantenimiento",
    descripcion: "Apreciables colonos...",
    visible: "Todos",
}];

const columnas = [{
    dataField: 'titulo',
    text: 'Título'
},
{
    dataField: 'descripcion',
    text: 'Descripción'
},
{
    dataField: 'visible',
    text: 'Visible para'
},{
    dataField: 'price',
    text: 'Acciones'
}];

var eventos = [{
    id: 1,
    titulo: "Posada",
    fecha:  "25 de Enero, 8:00pm",
    descripcion: "Posada de la colonia",
    lugar: "Terraza",
    visible: "Todos",
}, {
    id: 2,
    titulo: "Reservacion Casa 14",
    fecha:  "28 de Enero, 8:00pm",
    descripcion: "Reservacion por vecino",
    lugar: "Alberca",
    visible: "Todos",
}];

const columnasEventos = [{
    dataField: 'titulo',
    text: 'Título'
    },
    {
    dataField: 'fecha',
    text: 'Fecha y Hora'
    },
    {
        dataField: 'descripcion',
        text: 'Descripción'
    },
    {
        dataField: 'lugar',
        text: 'Lugar'
    },{
        dataField: 'price',
        text: 'Acciones'
    }];


const columnasFinanzas = [
        {
            dataField: 'fecha',
            text: 'Fecha '
        },
        {
        dataField: 'concepto',
        text: 'Concepto'
        },
        {
            dataField: 'categoria',
            text: 'Categoria'
        },
        {
            dataField: 'cargo',
            text: 'Cargo'
        },{
            dataField: 'recargos',
            text: 'Recargos'
        },
        {
            dataField: 'total',
            text: 'Total '
        },
    ];
    const columnasAreasComunes = [
        {
            dataField: 'fecha',
            text: 'Fecha '
        },
        {
            dataField: 'concepto',
            text: 'Concepto'
        },
        {
            dataField: 'categoria',
            text: 'Categoria'
        },
        {
            dataField: 'cargo',
            text: 'Cargo'
        },
        {
            dataField: 'recargos',
            text: 'Recargos'
        },
        {
            dataField: 'total',
            text: 'Total '
        },
    ];

export default class AdminDashboard extends React.Component{

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

    changeValue(e)
    {
        this.setState({dropDownValue: e.currentTarget.textContent})
    }

    toggle(tab) {
        console.log(tab);
        if(this.state.activeTab !== tab) {
            this.setState({activeTab:tab})
        }
    }

    toggleModal = ( modal ) => {

        switch (modal) {
            case 1: {
                this.state.modalAnuncio ? this.setState({modalAnuncio: false}) : this.setState({modalAnuncio: true});

                break;
            }
            case 2:{
                this.state.modalEvento ? this.setState({modalEvento: false}) : this.setState({modalEvento: true});
                break;
            }
            case 3: {
                this.state.modalFinanzas ? this.setState({modalFinanzas: false}) : this.setState({modalFinanzas: true});
                break;
            }
            case 4: {
                this.state.modalAreasComunes ? this.setState({modalAreasComunes: false}) : this.setState({modalAreasComunes: true});
                break;
            }

            default: {

            }
        }
    };

    render() {

        return (
            <div>
                <SideBar toggle={this.toggleSidebar} isOpen={this.state.isOpenSidebar}/>
                <div className="mt-3">

                    <header className="main-header ">
                        <Navbar className="header-dashboard navbar navbar-expand-xl animate fadeInDown one navbar-light top-navbar"
                                data-toggle="sticky-onscroll">
                            <div className="container">
                                <Button color="info" className="" onClick={this.toggleSidebar}>
                                    <FontAwesomeIcon icon={faBars}/>
                                </Button>
                                <NavLink className="navbar-brand" to="#">CondoSpace</NavLink>

                                <Collapse isOpen={this.state.isOpen} className="navbar-collapse justify-content-center" id="navbarSupportedContent" navbar>

                                    <ul className="navbar-nav">

                                        <li className="nav-item">
                                            <NavLink className="nav-link" href="/admin/anuncios"
                                                     className={2 === 1 ? 'active' : ''}>Anuncios
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" href="#"
                                                     className={this.state.activeTab === 2 ? 'active' : ''}>Eventos
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" href="#"
                                                     onClick={() => {this.toggle(3)}}
                                                     className={this.state.activeTab === 3 ? 'active' : ''}>Finanzas
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" href="#"
                                                     onClick={() => {this.toggle(4)}}
                                                     className={this.state.activeTab === 4 ? 'active' : ''}>Áreas Comunes
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" href="#"
                                                     onClick={() => {this.toggle(5)}}
                                                     className={this.state.activeTab === 5 ? 'active' : ''}>Condominios y Unidades
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" href="#"
                                                     onClick={() => {this.toggle(6)}}
                                                     className={this.state.activeTab === 6 ? 'active' : ''}>Usuarios
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <UncontrolledDropdown className="d-sm-none">
                                        <img src={require('./../../assets/images.png')} width={35} height={35} className="rounded-circle"/>
                                        <DropdownToggle caret>
                                            Nombre del usuario
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>Mis datos de perfil</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem>Cerrar Sesión</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Collapse>
                                <UncontrolledDropdown className="d-none d-sm-block">
                                    <img src={require('./../../assets/images.png')} width={35} height={35} className="rounded-circle"/>
                                    <DropdownToggle caret>
                                        Nombre del usuario
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Mis datos de perfil</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Cerrar Sesión</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                        </Navbar>
                    </header>


                    <div className="dashboard-content animate fadeInUp one">
                        <TabContent activeTab={this.state.activeTab} className="text-center">
                            <TabPane className={this.state.activeTab === 1 ? 'active' : ''} tabId="1">
                                <Row className="pt-5 justify-content-center">
                                    <Col className="col-11">
                                        <div>
                                            <AnunciosTable toggleModal={() => this.toggleModal(1)}/>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane className={this.state.activeTab === 2 ? 'active' : ''} tabId="2">
                                <Row className="justify-content-center">
                                    <Col className="col-11">
                                        <div>
                                            <EventosTable toggleModal={() => this.toggleModal(1)}/>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane className={this.state.activeTab === 3 ? 'active' : ''} tabId="3">
                                <Row className="justify-content-center">
                                    <Col className="col-11">
                                        <div>
                                            <FinanzasTable toggleModal={() => this.toggleModal(1)}/>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane className={this.state.activeTab === 4 ? 'active' : ''} tabId="4">
                                <Row className="justify-content-center">
                                    <Col className="col-11">
                                        <div>
                                            <AreasComunesTable toggleModal={() => this.toggleModal(1)}/>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            </div>
    );

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


    clearInput(e)
    {
        e.target.classList.remove('bounce');
    }

};
