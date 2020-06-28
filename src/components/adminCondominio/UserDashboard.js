import React, {useEffect} from 'react';
import {Col, Row,Container, Spinner} from "reactstrap";
import Header from "./common/header/Header";
import {withRouter} from 'react-router-dom';
import {useUsuario} from "../../context/usuario-context";

const UserDashboard = (props) => {
    const { fondo } = useUsuario();
    const CommonHeader = withRouter(props => <Header {...props}/>);
    const { userLoggedIn } = useUsuario();

    /*
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

    },[]);*/

    if(userLoggedIn) {
        return (<div>
            <CommonHeader/>
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

