import React, {useEffect} from 'react';
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import Header from "./common/header";
import { withRouter, useHistory } from 'react-router-dom'
import CookieService from "../../services/CookieService";
import {getUser} from "../../actions/getUser";
import './styles.scss';

export const AdminCondominio = (props) => {
    const history = useHistory();

    useEffect(() => {

        async function auth() {
            debugger;
            const accessToken = CookieService.get('access_token');

            //Si el token existe carga el usuario en el contexto
            if(accessToken === undefined) {
                history.push('/admin/login');
                return;
            }

            //Se obtiene una respuesta del servidor con los datos del usuario, de existir se setea en el contexto
            const response = await getUser(accessToken);

            if(response) {
                if(response.user.idTipoUsuario !== 1){
                    //history.push('/error/403')
                }
            }
        }

        auth();

    },[]);

    return(
        <div>
            <Header/>
            <div className={'dashboard-content animate fadeInUp one '}>
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
};

export default withRouter(AdminCondominio);
