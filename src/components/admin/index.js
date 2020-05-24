import React, {useState} from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Container,
    Row,
    Col,
    Button,
    NavLink,
    TabContent,
    TabPane,
    UncontrolledDropdown,
    Label,
    Collapse,
    NavbarToggler,
    Navbar,
} from "reactstrap";

import BootstrapTable from 'react-bootstrap-table-next';
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import NuevoEvento from "./modals/NuevoEvento";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faBars} from '@fortawesome/free-solid-svg-icons'
import SideBar from "./common/SideBar";
import {fetchRecords} from "../../actions/fetchRecords";
import ModalCondominio from './modals/ModalCondominio';

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
            isOpenSidebar:false,
            condominios: []
        }
    }

    async componentDidMount() {

        try {
            const arrayCondominios = await fetchRecords('condominiosUnidades');
            //const jsonCondominios = await arrayCondominios.json();
            this.setState({ condominios: arrayCondominios })
        }catch (error) {
            console.log(error);
        }


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

    toggleModal = () => {
        this.state.recordModal ? this.setState({recordModal: false}) : this.setState({recordModal: true});
    };

    redirectCondominio = (condominio) => {
        window.location.href = `/condominio/${condominio}`;
    };

    render() {


        return (
            <div>
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
                        <SideBar toggle={this.toggleSidebar} isOpen={this.state.isOpenSidebar}/>

                        
                        <ModalCondominio
                            idRecord={this.state.idRecord}
                            toggleModal={this.toggleModal}
                            recordModal={this.state.recordModal}
                            resource={'condominios'}
                        />
                        <Container>
                            <div className="row pt-5 justify-content-end">
                                <div className="col-3" className="justify-content-end">
                                    <Button onClick={() => this.toggleModal()} className="actionButton ">Nuevo Condominio</Button>
                                </div>
                            </div>
                            <Row className="mt-1">
                                {
                                     this.state.condominios.map((value,index) => {
                                        return (
                                        <Col xs="4">
                                            <Card>
                                                <CardBody className="text-center">
                                                    <CardTitle>
                                                    <h3>
                                                        {value.nombreCondominio}
                                                    </h3>
                                                    </CardTitle>
                                                    <CardSubtitle>{value.unidades.length == '1' ? `${value.unidades.length} Unidad` : `${value.unidades.length} Unidades`}</CardSubtitle>
                                                    <Button className="mt-2 actionButton" onClick={() => this.redirectCondominio(value.idCondominio)}>Seleccionar</Button>
                                                </CardBody>
                                            </Card>
                                        </Col>)
                                    })
                                }
                            </Row>
                        </Container>
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
