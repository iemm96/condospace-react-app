import React, {useState,useEffect} from 'react';
import {Col, Row,Container} from "reactstrap";
import Header from "./common/Header";
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {url_base} from "../../constants/api_url";
import CookieService from "../../services/CookieService";
import {useUsuario} from "../../context/usuario-context";
const api_url = url_base;

const CommonHeader = withRouter(props => <Header {...props}/>);

const UserDashboard = (props) => {
    const {usuario,setCargandoUsuario,errorPassword,setUsuario,getUser} = useUsuario();
    const authToken = CookieService.get('access_token');

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

export const DashboardContainerWithRouter = withRouter(UserDashboard);

