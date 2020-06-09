import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";

let tipoUnidad = [];
let personas = [];
let condominios = [];
let optionsTipoUnidad = [];
let optionsPersona = [];
let optionsCondominio = [];

export default class ModalUnidad extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
        try {
            condominios = await fetchRecords('condominios');
        }catch (error) {
            console.log(error);
        }
        try {
            personas = await fetchRecords('personas');
        }catch (error) {
            console.log(error);
        }
        try {
            tipoUnidad = await fetchRecords('tipoUnidad');
        }catch (error) {
            console.log(error);
        }
        condominios.map((val) => {
            optionsCondominio.push({value:val.idCondominio,label:val.nombreCondominio,name:'idCondominio'});
        });

        /*
        personas.map((val) => {
            optionsPersona.push({value:val.idPersona,label:val.nombre,name:'idPersona'});
        });

        tipoUnidad.map((val) => {
            optionsTipoUnidad.push({value:val.idTipoUnidad,label:val.nombre,name:'tipoUnidad'});
        });*/
        
        console.log('idRecord ',this.props.idRecord);
        if(this.props.idRecord) {
            let recordData = await fetchRecord(this.props.idRecord,this.props.resource);
            this.setState({...recordData});
        }
    }






    async componentWillReceiveProps(nextProps) {
        this.setState({
            idUnidad:nextProps.idRecord
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

        return(<Modal isOpen={this.props.recordModal} toggle={() => this.props.toggleModal()}>
            <ModalHeader toggle={() => this.props.toggleModal()}>{this.props.idRecord ? 'Actualizar' : 'Crear'} Unidad</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.state.idRecord ? updateRecord(this.state) : storeRecord(this.state)}>
                    <FormGroup>
                        <Input type="text" name="nombre" id="" placeholder="Nombre"
                               value={this.props.idRecord ? this.state.unidad : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="calle" id="" placeholder="Calle"
                               value={this.props.idRecord ? this.state.calle : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="noExterior" id="" placeholder="Numero Exterior"
                               value={this.props.idRecord ? this.state.noExterior : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="noInterior" id="" placeholder="Numero Interior"
                               value={this.props.idRecord ? this.state.noInterior : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="entre1" id="" placeholder="Entre Calle "
                               value={this.props.idRecord ? this.state.entre1 : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="entre2" id="" placeholder="y Calle"
                               value={this.props.idRecord ? this.state.entre2 : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="mts2" id="" placeholder="Metros Cuadrados"
                               value={this.props.idRecord ? this.state.mts2 : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Tipo de Unidad</label>
                                <Select options={optionsTipoUnidad}
                                        name="tipoUnidad"
                                        onChange={event => this.handleInputChange(event)}>
                                </Select>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Persona</label>
                                <Select options={optionsPersona}
                                        name="idPersona"
                                        onChange={event => this.handleInputChange(event)}>
                                </Select>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Codominio</label>
                                <Select options={optionsCondominio}
                                        name="idCondominio"
                                        onChange={event => this.handleInputChange(event)}>
                                </Select>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancelar</Button>
                <Button onClick={this.props.idRecord ? updateRecord(this.state,this.props.resource,this.props.idRecord) : storeRecord(this.state,this.props.resource)} type="button" color="primary">{this.props.idRecord ? 'Actualizar ' : 'Crear '} Unidad</Button>
            </ModalFooter>
        </Modal>);
    }

};
