import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";

let idVisitante = [];

export default class ModalAnuncio extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id:this.props.idRecord
        }
    }

    async componentDidMount() {
        try {
            idVisitante = await fetchRecords('tiposImportancia');
        }catch (error) {
            console.log(error);
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

        let idVisitante = [];

        idVisitante.map((val) => {
            optionsidVisitante.push({value:val.id,label:val.idVisitante,name:'id_visitante'});
        });

        console.log(this.state.titulo);

        return(<Modal isOpen={this.props.recordModal} toggle={() => this.props.toggleModal()}>
            <ModalHeader toggle={() => this.props.toggleModal()}>{this.props.idRecord ? 'Actualizar' : 'Crear'} Anuncio</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.state.idRecord ? updateRecord(this.state) : storeRecord(this.state)}>
                    <FormGroup>
                        <Input type="text" name="marca" id="" placeholder="Marca"
                               value={this.props.idRecord ? this.state.titulo : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="modelo" id="" placeholder="Modelo"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="color" id="" placeholder="Color"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="placas" id="" placeholder="Placas"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" name="tipoVehiculo" id="" placeholder="Tipo de Vehiculo"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Visitante</label>
                                <Select options={optionsVisitante}
                                        name="id_visitante"
                                        onChange={event => this.handleInputChange(event)}>
                                </Select>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancelar</Button>
                <Button form="form" type="submit" color="primary">{this.props.idRecord ? 'Actualizar ' : 'Crear '} Anuncio</Button>
            </ModalFooter>
        </Modal>);
    }

};
