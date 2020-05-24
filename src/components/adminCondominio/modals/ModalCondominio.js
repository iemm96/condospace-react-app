import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";


let tiposImportancia = [];
let tiposVisibilidad = [];

export default class ModalCondominio extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            idCondominio:this.props.idRecord
        }
    }
    async componentWillReceiveProps(nextProps) {
        this.setState({
            idCondominio:this.props.idRecord
        });
    }

    async componentDidMount() {
        try {
            tiposImportancia = await fetchRecords('tiposImportancia');
        }catch (error) {
            console.log(error);
        }

        try {
            tiposVisibilidad = await fetchRecords('tiposVisibilidad');
        }catch (error) {
            console.log(error);
        }

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

        console.log(event);
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
    }

    render() {

       console.log(this.state.titulo);

        return(<Modal isOpen={this.props.recordModal} toggle={() => this.props.toggleModal()}>
            <ModalHeader toggle={() => this.props.toggleModal()}>{this.props.idRecord ? 'Actualizar' : 'Nuevo'} Condominio</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.state.idRecord ? updateRecord(this.state) : storeRecord(this.state)}>
                    <Row>
                        <Col sm={8}>
                            <FormGroup>
                                <Label>*Nombre del Condominio</Label>
                                <Input type="text"
                                       name="nombreCondominio"
                                       value={this.props.idRecord ? this.state.nombreCondominio : undefined}
                                       onChange={event => this.handleInputChange(event)}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <Label>*URL personalizada</Label>
                                <Input type="text"
                                       name="dominio"
                                       value={this.props.idRecord ? this.state.dominio : undefined}
                                       onChange={event => this.handleInputChange(event)}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <p className="divider">
                        Datos del domicilio
                        <hr/>
                    </p>
                    <Row>
                        <Col sm={8}>
                            <FormGroup>
                                <label>*Calle</label>
                                <Input type="text"
                                       name="calle"
                                       value={this.props.idRecord ? this.state.calle : undefined}
                                       onChange={event => this.handleInputChange(event)}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <FormGroup>
                                <label>*Número exterior</label>
                                <Input type="text"
                                       name="noExterior"
                                       value={this.props.idRecord ? this.state.noExterior : undefined}
                                       onChange={event => this.handleInputChange(event)}/>
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <FormGroup>
                                <label>Número interior</label>
                                <Input type="text"
                                       name="noInterior"
                                       value={this.props.idRecord ? this.state.noInterior : undefined}
                                       onChange={event => this.handleInputChange(event)}/>
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <FormGroup>
                                <label>*Código Postal</label>
                                <FormGroup>
                                    <Input type="text"
                                           name="cp"
                                           value={this.props.idRecord ? this.state.cp : undefined}
                                           onChange={event => this.handleInputChange(event)}/>
                                </FormGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <FormGroup>
                                <label>Entre Calle 1</label>
                                <Input type="text"
                                       name="entre1"
                                       value={this.props.idRecord ? this.state.entre1 : undefined}
                                       onChange={event => this.handleInputChange(event)}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <FormGroup>
                                <label>Entre Calle 2</label>
                                <Input type="text"
                                       name="entre2"
                                       value={this.props.idRecord ? this.state.entre2 : undefined}
                                       onChange={event => this.handleInputChange(event)}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <FormGroup>
                                <label>Ciudad</label>
                                <Input type="text"
                                       name="ciudad"
                                       value={this.props.idRecord ? this.state.ciudad : undefined}
                                       onChange={event => this.handleInputChange(event)}/>
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <FormGroup>
                                <label>Municipio</label>
                                <Input type="text"
                                       name="municipio"
                                       value={this.props.idRecord ? this.state.municipio : undefined}
                                       onChange={event => this.handleInputChange(event)}/>
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <FormGroup>
                                <label>Estado</label>
                                <Input type="text"
                                       name="estado"
                                       value={this.props.idRecord ? this.state.estado : undefined}
                                       onChange={event => this.handleInputChange(event)}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <p className="center">Los campos marcados con * son obligatorios</p>

            <ModalFooter className="d-flex justify-content-around" >
                    <Button className="neutralButton" onClick={() => this.props.toggleModal()}>Cancelar</Button>
                    <Button className="confirmButton" onClick={this.state.idRecord ? (e) => updateRecord(e,this.state) : storeRecord(this.state,this.props.resource)} type="button">{this.props.idRecord ? 'Actualizar ' : 'Crear '} Condominio</Button>
            </ModalFooter>
        </Modal>);
    };


};
