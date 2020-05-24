import React from 'react';
import {Col, Row,Container} from "reactstrap";
import Header from "./common/Header";
import {withRouter} from 'react-router-dom';
const CommonHeader = withRouter(props => <Header {...props}/>);

export const AdminCondominioDashboard = ( props ) => (
    <div>
        <CommonHeader/>
        <div className="dashboard-content animate fadeInUp one">
            <Container>
                <Row className="pt-5 justify-content-center">
                    <Col className="col-11">
                        <div>
                            { props.children }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
);
