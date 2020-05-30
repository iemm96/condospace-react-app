import React, {useState,useEffect} from 'react';
import {Col, Row,Container} from "reactstrap";
import Header from "./common/Header";
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {url_base} from "../../constants/api_url";
import CookieService from "../../services/CookieService";
const api_url = url_base;

const CommonHeader = withRouter(props => <Header {...props}/>);

const DashboardContainer = (props) => {
    const [data, setData] = useState({ hits: [] });
    const authToken = CookieService.get('access_token');

    console.log(authToken);
    useEffect(async () => {
        const result = await axios({
            url:`${api_url}user`,
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Authorization": 'Bearer ' + authToken,
            },
        }).then(
            (response) => {return response.data},
            (error) => {console.log(error)}
        );

        if(result['condominio'] !== props.match.params.condominio) {
            window.location.href = `/${result['condominio']}/login`;
        }

    });

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

export const DashboardContainerWithRouter = withRouter(DashboardContainer);

