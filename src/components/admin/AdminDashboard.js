import React, {useEffect} from 'react';
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import {useUsuario} from "./../../context/usuario-context";
import './assets/admin.scss';
import {withRouter} from "react-router-dom";
import {AdminHeader} from "./common/Header";

const CommonHeader = withRouter(props => <AdminHeader {...props}/>);

export const AdminDashboardWithRouter = (props) => {
    const {errorUser,errorPassword,usuario,tipoUsuario} = useUsuario();

    /*
    useEffect( () => {
        console.log(tipoUsuario);
        console.log(usuario);
        debugger;
        if(tipoUsuario !== 1) {
            window.location.href = '/admin/login';
        }
    });*/

    return(
        <div>
            <CommonHeader/>
            <div className="dashboard-content animate fadeInUp one">
                <Container>
                    <Row className="pt-5 justify-content-center">
                        <Col className="col-11">
                            <div>
                                {props.children}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>)
}

//export const AdminDashboardWithRouter = withRouter(AdminDashboard);

/*
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
        window.location.href = `/admin/condominio/${condominio}`;
    };

    cerrarSesion = () => {
        console.log('cerrar');
        CookieService.remove('access_token');
        CookieService.remove('tipoUsuario');

        window.location.href = '/admin/login';
    }

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
                                            <DropdownItem onClick={this.cerrarSesion}>Cerrar Sesión</DropdownItem>
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
                                        <DropdownItem onClick={this.cerrarSesion}>Cerrar Sesión</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                        </Navbar>
                    </header>

                    <div className="dashboard-content animate fadeInUp one">
                        <SideBar toggle={this.toggleSidebar} isOpen={this.state.isOpenSidebar}/>

                        <Container className="pt-5">
                                {this.props.children}
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
*/