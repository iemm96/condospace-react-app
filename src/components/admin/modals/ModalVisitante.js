import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";

let unidades = [];
export default class ModalVisitante extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id:this.props.idRecord
        }
    }

    async componentDidMount() {
        try {
            unidades = await fetchRecords('unidades');
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

        let optionsUnidades = [];

        unidades.map((val) => {
            optionsUnidades.push({value:val.id,label:val.unidad,name:'idUnidad'});
        });

        console.log(this.state.titulo);

        return(<Modal isOpen={this.props.recordModal} toggle={() => this.props.toggleModal()}>
            <ModalHeader toggle={() => this.props.toggleModal()}>{this.props.idRecord ? 'Actualizar' : 'Crear'} Visitante</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.state.idRecord ? updateRecord(this.state) : storeRecord(this.state)}>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Tipo de Visitante</label>
                                <Select onChange={event => this.handleInputChange(event)}>
                                    <option value="0">Servicio</option>
                                    <option value="1">Personal</option>
                                </Select>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Input type="text" name="nombre" id="" placeholder="Nombre"
                               value={this.props.idRecord ? this.state.nombre : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="apellidos" id="" placeholder="Apellidos"
                               value={this.props.idRecord ? this.state.apellidos : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="detalles" id="" placeholder="Motivo de la visita"
                               value={this.props.idRecord ? this.state.detalles : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>

                    <FormGroup>
                        <Input type="date" name="identificacion" id="" placeholder="Numero de identificacion"
                               value={this.props.idRecord ? this.state.identificacion : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="date" name="fechaLlegada" id="" placeholder="Fecha de llegada"
                               value={this.props.idRecord ? this.state.fechaLlegada : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="date" name="fechaSalida" id="" placeholder="Fecha de Salida"
                               value={this.props.idRecord ? this.state.fechaSalida : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup >
                        <Input type="number" name="noVisitantes" id="" placeholder="Numero de Visitantes"
                               value={this.props.idRecord ? this.state.noVisitantes : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Unidad a visitar</label>
                                <Select options={optionsUnidades}
                                        name="idUnidad"
                                        onChange={event => this.handleInputChange(event)}>
                                </Select>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancelar</Button>
                <Button form="form" type="submit" color="primary">{this.props.idRecord ? 'Actualizar ' : 'Crear '} Visitante</Button>
            </ModalFooter>
        </Modal>);
    }

};
