import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";

let idCuenta = [];
let idPersona = [];
let idCategoria = [];

export default class ModalFinanzas extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id:this.props.idRecord
        }
    }

    async componentDidMount() {
        try {
            idCuenta = await fetchRecords('idCuenta');
        }catch (error) {
            console.log(error);
        }

        try {
            idPersona = await fetchRecords('idPersona');
        }catch (error) {
            console.log(error);
        }

        try {
            idCategoria = await fetchRecords('idCategoria');
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
        let optionsCuenta = [];
        let optionsPersona = [];
        let optionsCategoria = [];

        idCuenta.map((val) => {
            optionsCuenta.push({value:val.id,label:val.Cuenta,name:'id_Cuenta'});
        });

        idPersona.map((val) => {
            optionsPersona.push({value:val.id,label:val.Persona,name:'id_Persona'});
        });

        idCategoria.map((val) => {
            optionsCategoria.push({value:val.id,label:val.Categoria,name:'id_Categoria'});
        });
        console.log(this.state.titulo);

        return(<Modal isOpen={this.props.recordModal} toggle={() => this.props.toggleModal()}>
            <ModalHeader toggle={() => this.props.toggleModal()}>{this.props.idRecord ? 'Actualizar' : 'Crear'} Finanzas</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.state.idRecord ? updateRecord(this.state) : storeRecord(this.state)}>
                    <FormGroup>
                        <Input type="date" name="fechaTransaccion" id="" placeholder="Fecha de transaccion"
                               value={this.props.idRecord ? this.state.titulo : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="textarea" name="descripcion" id="" placeholder="Descripción"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" name="ingresooEgreso" id="" placeholder="Ingreso o Egreso"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" name="monto" id="" placeholder="Monto"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="saldo" id="" placeholder="Saldo"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" name="moneda" id="" placeholder="Moneda"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" name="formadePago" id="" placeholder="Forma de pago"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="referencia" id="" placeholder="Referencia"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Cuenta</label>
                                <Select options={optionsCuenta}
                                        name="id_Cuenta"
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
                                        name="id_Persona"
                                        onChange={event => this.handleInputChange(event)}>
                                </Select>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Categoria</label>
                                <Select options={optionsCategoria}
                                        name="id_Categoria"
                                        onChange={event => this.handleInputChange(event)}>
                                </Select>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancelar</Button>
                <Button form="form" type="submit" color="primary">{this.props.idRecord ? 'Actualizar ' : 'Crear '} Finanzas</Button>
            </ModalFooter>
        </Modal>);
    }

};
