import React, {useState,useEffect} from 'react';
import {Col, Row,Container} from "reactstrap";
import Header from "./common/Header";
import {withRouter} from 'react-router-dom';
import {useHistory} from 'react-router';

import axios from 'axios';
import {url_base} from "../../constants/api_url";
import CookieService from "../../services/CookieService";
import {useUsuario} from "../../context/usuario-context";
import {getUser} from "../../actions/getUser";
const api_url = url_base;

const CommonHeader = withRouter(props => <Header {...props}/>);

const UserDashboard = (props) => {
    const {usuario,setCargandoUsuario,errorPassword,setUsuario,setUserLoggedIn,setIdCondominio,userLoggedIn} = useUsuario();
    const authToken = CookieService.get('access_token');
    let history = useHistory();
    const condominio  = props.match.params.condominio;

    useEffect(() => {

        async function cargarUsuario() {


            try{
                const accessToken = CookieService.get('access_token');

                //Si el token existe carga el usuario en el contexto
                if(accessToken === undefined) {
                    history.push(`/${condominio}/login`);
                }

                //Si está cargado el usuario en su contexto se retorna la función
                if(userLoggedIn) {
                   return;
                }

                //Se obtiene una respuesta del servidor con los datos del usuario, de existir se setea en el contexto
                const response = await getUser(accessToken);
                if(response) {
                    setUsuario(response);
                    setIdCondominio(response.user.idCondominio);
                    setCargandoUsuario(false);
                    setUserLoggedIn(true);
                }
            }catch (e) {
                console.log(e);
            }
        }

        cargarUsuario();

    },[]);

    return(
        <div>
            <CommonHeader/>
            <div className="dashboard-content animate fadeInUp one">
                <Container>
                    <Row className="pt-5 justify-content-center">
                        <Col className="col-11">
                            <div>
                                {userLoggedIn ? props.children : ''}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>)
}

export const DashboardContainerWithRouter = withRouter(UserDashboard);

