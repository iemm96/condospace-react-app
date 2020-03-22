import React, { useState } from 'react';
import {Col, Row, TabContent, TabPane,Container} from "reactstrap";
import Header from "./../common/Header";
import {withRouter} from 'react-router-dom';
import CondominioTable from "../tables/CondominioTable";
const CommonHeader = withRouter(props => <Header {...props}/>);

const Condominio = ( ) => (
    <div>
        <CommonHeader/>
        <div className="dashboard-content animate fadeInUp one">
            <Container>
                <Row className="pt-5 justify-content-center">
                    <Col className="col-11">
                        <div>
                            <CondominioTable toggleModal={() => this.toggleModal(1)}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
);

export default Condominio;