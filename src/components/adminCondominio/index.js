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
import {useUsuario} from "../../context/usuario-context";

export const AdminCondominio = (props) => {
    const { usuario, userLoggedIn,setIdCondominio,tipoUsuario } = useUsuario();
    const history = useHistory();

    useEffect(() => {

        async function auth() {

            if(!userLoggedIn) {
                //history.push(`/${urlCondominio}`);
            }

            setIdCondominio(usuario.user.idCondominio);

            if(tipoUsuario !== 2){
                history.push('/error/403')
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
