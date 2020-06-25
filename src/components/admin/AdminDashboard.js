import React from 'react';
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import './assets/admin.scss';
import {withRouter} from "react-router-dom";
import {AdminHeader} from "./common/header/Header";
import {useUsuario} from "../../context/usuario-context";

const CommonHeader = withRouter(props => <AdminHeader {...props}/>);

export const AdminDashboardWithRouter = (props) => {
    const { fondo } = useUsuario();

    return(
        <div>
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
        </div>)
};

