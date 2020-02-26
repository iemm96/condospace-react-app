import React, {useState} from 'react';
import {NavItem, NavLink, TabContent, TabPane, UncontrolledDropdown, Row, Col, Button} from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import NuevoEvento from "./modals/NuevoEvento";

import AnunciosTable from "./tables/AnunciosTable";
import EventosTable from "./tables/EventosTable";
import FinanzasTable from "./tables/FinanzasTable";
//import AreasComunesTable from "./tables/AreasComunesTable";

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

var finanzas = [{
    id: 1,
    fecha:  "15-01-2020",
    concepto: "Agua Eenero 2020",
    categoria: "AGUA POTABLE",
    cargo: "$100",
    recargos: "$0",
    total: "$100",
}, {
    id: 2,
    fecha:  "15-01-2020",
    concepto: "Mantenimiento Enero 2020",
    categoria: "MANTENIMIENTO",
    cargo: "$250",
    recargos: "$0",
    total: "$250",
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

export default class AdminDashboard extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            setActiveTab: 1,
            activeTab: 1,
            dropDownValue: 'Select action',
            dropdownOpen: false,
            modalEvento: false,
            modalAnuncio: false
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

                break;
            }
            case 4: {

                break;
            }

            default: {

            }
        }
    };

    render() {

        return (

            <div className="mt-3">
                <header className="">
                    <nav className="header-dashboard navbar navbar-expand-lg navbar-light top-navbar  animate fadeInDown one"
                         data-toggle="sticky-onscroll">
                        <div className="container">

                            <NavLink className="navbar-brand" to="#">CondoSpace</NavLink>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon">i</span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" href="#" onClick={() => {this.toggle(1)}}
                                                 className={this.state.activeTab === 1 ? 'active' : ''}>Anuncios</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" href="#" onClick={() => {this.toggle(2)}}
                                                 className={this.state.activeTab === 2 ? 'active' : ''}>Eventos</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" href="#" onClick={() => {this.toggle(3)}}
                                                 className={this.state.activeTab === 3 ? 'active' : ''}>Finanzas</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" href="#"  onClick={() => {this.toggle(4)}}
                                                 className={this.state.activeTab === 4 ? 'active' : ''}>Áreas Comunes</NavLink>
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
                            <Row className="justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        <BootstrapTable keyField='id' data={ anuncios } columns={ columnas } />
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 2 ? 'active' : ''} tabId="2">
                            <Row className="justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        { <BootstrapTable keyField='id' data={ eventos } columns={ columnasEventos } /> }
                                        <EventosTable toggleModal={() => this.toggleModal(1)}/>

                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 3 ? 'active' : ''} tabId="3">
                            <Row className="justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        <BootstrapTable keyField='id' data={ finanzas } columns={ columnasFinanzas } />
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 4 ? 'active' : ''} tabId="4">
                        </TabPane>
                    </TabContent>
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

    clearInput(e)
    {
        e.target.classList.remove('bounce');
    }

};
