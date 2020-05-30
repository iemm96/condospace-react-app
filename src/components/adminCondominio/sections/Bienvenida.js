import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import stringifyData from "../../../services/stringifyData";
import {url_base} from "../../../constants/api_url";
import CookieService from "../../../services/CookieService";
const api_url = url_base;



export default class Bienvenida extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    async componentDidMount() {

    }

    async componentWillReceiveProps(nextProps) {
        this.setState({
            idCondominio:nextProps.idRecord
        });

        if(nextProps.idRecord) {
            try {
                let recordData = await fetchRecord(nextProps.idRecord,this.props.resource);
                this.setState({...recordData});
            }catch (error) {
                console.log(error);
            }
        }
    }

    handleInputChange = event => {

        let target;

        if(target = event.target) {
            const value = target.value;
            const name = target.name;
            this.setState({
                [name]:value
            });
        }else{
            const name = event.name;
            const value = event.value;
            this.setState({
                [name]:value
            })
        }
    };

    updatePasword = () => {
        const authToken = CookieService.get('access_token');

        fetch(`${api_url}updateUserPassword`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
                "Authorization": 'Bearer ' + authToken,
            },
            body:stringifyData(this.state)
        }).then((res) => res.json())
            .then((data) =>  {
                window.location.href = `/${this.props.match.params.condominio}/agregarUnidades`;
            })
            .catch((err)=>console.log(err));
    }

    render() {

        console.log('here');

        return(
            <div>
                <Row className="text-center">
                    <Col >
                        <h4>¡Te damos la bienvenida a CondoSpace!</h4>
                        <p>Antes de continuar es necesario definir una contraseña</p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col>
                        <Form id="form" onSubmit={this.state.idRecord ? updateRecord(this.state) : storeRecord(this.state)}>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>*Contraseña</Label>
                                        <Input type="password"
                                               name="password"
                                               onChange={event => this.handleInputChange(event)}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>*Confirma tu contraseña</Label>
                                        <Input type="password"
                                               name="rtpassword"
                                               onChange={event => this.handleInputChange(event)}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button className="confirmButton" onClick={this.updatePasword} type="button">Guardar y contnuar</Button>

                        </Form>
                    </Col>
                </Row>
            </div>
        );
    };


};
