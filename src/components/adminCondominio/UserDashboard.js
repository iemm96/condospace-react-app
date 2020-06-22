import React, {useEffect} from 'react';
import {Col, Row,Container, Spinner} from "reactstrap";
import Header from "./common/header/Header";
import {withRouter} from 'react-router-dom';
import {useHistory} from 'react-router';
import CookieService from "../../services/CookieService";
import {useUsuario} from "../../context/usuario-context";
import {getUser} from "../../actions/getUser";

const UserDashboard = (props) => {
    const { fondo,setTema,setFondo } = useUsuario();
    const CommonHeader = withRouter(props => <Header {...props}/>);
    const {setCargandoUsuario,setUsuario,setUserLoggedIn,setIdCondominio,userLoggedIn} = useUsuario();
    let history = useHistory();
    const condominio  = props.match.params.condominio;

    useEffect(() => {

        async function cargarUsuario() {

            try{

                //Si el token existe carga el usuario en el contexto
                if(!userLoggedIn) {
                    //history.push(`/${condominio}/login`);
                }

            }catch (e) {
                console.log(e);
            }
        }

        cargarUsuario();

    },[]);

    if(userLoggedIn) {
        return (<div>
            <CommonHeader condominio={condominio}/>
            <div className={'dashboard-content animate fadeInUp one ' + fondo}>
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
        </div>);
    }else{
        return (
            <div className="text-center pt-auto" style={{marginTop: '20%'}}>
                <Spinner type="grow" color="light" style={{ width: '4rem', height: '4rem' }}/>
            </div>
        );
    }
}

export const DashboardContainerWithRouter = withRouter(UserDashboard);

