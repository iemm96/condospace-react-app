import React, { useState } from 'react';
import {Col, Row, TabContent, TabPane,Container} from "reactstrap";
import {withRouter} from 'react-router-dom';
import AreasComunesTable from "../tables/AreasComunesTable";
import Header from "./../common/Header";
const CommonHeader = withRouter(props => <Header {...props}/>);

const AreasComunes = ( ) => (
    <div>
        <CommonHeader/>
        <div className="dashboard-content animate fadeInUp one">
            <Container>
                <Row className="pt-5 justify-content-center">
                    <Col className="col-11">
                        <div>
                            <AreasComunesTable toggleModal={() => this.toggleModal(1)}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
);

export default AreasComunes;