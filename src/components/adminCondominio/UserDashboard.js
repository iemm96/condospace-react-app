import React, {useEffect} from 'react';
import {Col, Row,Container, Spinner} from "reactstrap";
import Header from "./common/Header";
import {withRouter} from 'react-router-dom';
import {useHistory} from 'react-router';
import CookieService from "../../services/CookieService";
import {useUsuario} from "../../context/usuario-context";
import {getUser} from "../../actions/getUser";


const UserDashboard = (props) => {
    const CommonHeader = withRouter(props => <Header {...props}/>);
    const {setCargandoUsuario,setUsuario,setUserLoggedIn,setIdCondominio,userLoggedIn} = useUsuario();
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

    if(userLoggedIn) {
        return (<div>
            <CommonHeader condominio={condominio}/>
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

