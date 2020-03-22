import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";

let tiposImportancia = [];
let tiposVisibilidad = [];

export default class ModalAnuncio extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            idAnuncio:this.props.idRecord
        }
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
            idAnuncio:nextProps.idRecord
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

    render() {

        let optionsImportancia = [];
        let optionsVisibilidad = [];

        tiposImportancia.map((val) => {
            optionsImportancia.push({value:val.id,label:val.importancia,name:'id_importancia'});
        });

        tiposVisibilidad.map((val) => {
            optionsVisibilidad.push({value:val.id,label:val.visibilidad,name:'id_visibilidad'});
        });

        return(<Modal isOpen={this.props.recordModal} toggle={() => this.props.toggleModal()}>
            <ModalHeader toggle={() => this.props.toggleModal()}>{this.props.idRecord ? 'Actualizar' : 'Crear'} Anuncio</ModalHeader>
            <ModalBody>
                <Form id="form" >
                    <FormGroup>
                        <Input type="text" name="titulo" id="" placeholder="Título"
                               value={this.props.idRecord ? this.state.titulo : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="textarea" name="mensaje" id="" placeholder="Descripción"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Visibilidad</label>
                                <Select options={optionsVisibilidad}
                                        name="id_visibilidad"
                                        onChange={event => this.handleInputChange(event)}>
                                </Select>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Importancia</label>
                                <Select options={optionsImportancia}
                                        name="id_nivelImportancia"
                                        onChange={event => this.handleInputChange(event)}>
                                </Select>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup row>
                        <Col sm={{ size: 10 }}>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="notificarEmail" id="checkbox2" />{' '}
                                    Notificar por correo
                                </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancelar</Button>
                <Button onClick={this.state.idRecord ? (e) => updateRecord(e,this.state) : storeRecord(this.state,this.props.resource)} type="button" color="primary">{this.props.idRecord ? 'Actualizar ' : 'Crear '} Anuncio</Button>
            </ModalFooter>
        </Modal>);
    }

};
