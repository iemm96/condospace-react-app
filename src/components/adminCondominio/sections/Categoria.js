import React, { useState } from 'react';
import {Col, Row, TabContent, TabPane,Container} from "reactstrap";
import CategoriaTable from "../tables/CategoriaTable";
import Header from "./../common/Header";
import {withRouter} from 'react-router-dom';
const CommonHeader = withRouter(props => <Header {...props}/>);

const Categoria = ( ) => (
    <div>
        <CommonHeader/>
        <div className="dashboard-content animate fadeInUp one">
            <Container>
                <Row className="pt-5 justify-content-center">
                    <Col className="col-11">
                        <div>
                            <CategoriaTable toggleModal={() => this.toggleModal(1)}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
);

export default Categoria;