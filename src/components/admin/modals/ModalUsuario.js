import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";



export default class ModalUsuario extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            idTipoUsuario: 2, //usuario administrador del condominio = 2
            idCondominio: this.props.idCondominio,
            password:'admin_condominio'
        }
    }
    async componentWillReceiveProps(nextProps) {
        this.setState({
            id:nextProps.idRecord
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
            <ModalHeader toggle={() => this.props.toggleModal()}>{this.props.idRecord ? 'Actualizar' : 'Nuevo'} Usuario Administrador</ModalHeader>
            <ModalBody>
                <Form id="form">
                    <Row>
                        <Col sm={8}>
                            <FormGroup>
                                <Label>*Nombre completo</Label>
                                <Input type="text" name="name" id="" placeholder=""
                                       value={this.props.idRecord ? this.state.name : undefined}
                                       onChange={event => this.handleInputChange(event)}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <Label>*Email</Label>
                                <Input type="text" name="email" id=""
                                       value={this.props.idRecord ? this.state.email : undefined}
                                       onChange={event => this.handleInputChange(event)}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <Label>Teléfono</Label>
                                <Input type="text" name="telefono" id=""
                                       value={this.props.idRecord ? this.state.telefono : undefined}
                                       onChange={event => this.handleInputChange(event)}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                <p className="justify-content-start">La contraseña por defecto es admin_condominio</p>
            </ModalBody>
            <p className="center">Los campos marcados con * son obligatorios</p>
            <ModalFooter className="d-flex justify-content-around">
                <Button className="neutralButton" onClick={() => this.props.toggleModal()}>Cancelar</Button>
                <Button className="confirmButton" form="form" onClick={storeRecord(this.state,'register')} color="primary">{this.props.idRecord ? 'Actualizar ' : 'Crear '} Usuario</Button>
            </ModalFooter>

        </Modal>);
    }

};
