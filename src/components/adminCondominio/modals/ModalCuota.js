import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";

let tipoCuota = [];
let optionsTipoCuota = [];

export default class ModalAnuncio extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
        try {
            tipoCuota = await fetchRecords('tipoCuotas');
        }catch (error) {
            console.log(error);
        }

        tipoCuota.map((val) => {
            optionsTipoCuota.push({value:val.idTipoCuota,label:val.nombre,name:'tipoCuota'});
        });

        console.log('idRecord ',this.props.idRecord);
        if(this.props.idRecord) {
            let recordData = await fetchRecord(this.props.idRecord,this.props.resource);
            this.setState({...recordData});
        }
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({
            idCuota:nextProps.idRecord
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
            <ModalHeader toggle={() => this.props.toggleModal()}>{this.props.idRecord ? 'Actualizar' : 'Crear'} Cuota</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.state.idRecord ? updateRecord(this.state) : storeRecord(this.state)}>
                    <FormGroup>
                        <Input type="text" name="nombre" id="" placeholder="Nombre"
                               value={this.props.idRecord ? this.state.nombre : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="date" name="fechaIni" id="" placeholder="Fecha de Inicio"
                               value={this.props.idRecord ? this.state.fechaIni : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="date" name="fechafin" id="" placeholder="Fecha Fin"
                               value={this.props.idRecord ? this.state.fechaFin : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="decimal" name="monto" id="" placeholder="Monto"
                               value={this.props.idRecord ? this.state.monto : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" name="periodo" id="" placeholder="Periodo (en meses)"
                               value={this.props.idRecord ? this.state.periodo : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Tipo de Cuota</label>
                                <Select options={optionsTipoCuota}
                                        name="tipoCuota"
                                        value={optionsTipoCuota.find(op => {
                                            return op.value == this.state.tipoCuota
                                        })}
                                        onChange={event => this.handleInputChange(event)}>
                                </Select>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancelar</Button>
                <Button onClick={this.props.idRecord ? updateRecord(this.state,this.props.resource,this.props.idRecord) : storeRecord(this.state,this.props.resource)} type="button" color="primary">{this.props.idRecord ? 'Actualizar ' : 'Crear '} Cuota</Button>
            </ModalFooter>
        </Modal>);
    }

};
