import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";

let condominios = [];
let optionsidCondominio = [];

export default class ModalArea extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            idAreas:this.props.idRecord
        }
    }

    async componentDidMount() {
        try {
            condominios = await fetchRecords('condominios');
        }catch (error) {
            console.log(error);
        }

        condominios.map((val) => {
            optionsidCondominio.push({value:val.idCondominio,label: val.nombreCondominio,name:'idCondominio'});
        });

        console.log('idRecord ',this.props.idRecord);
        if(this.props.idRecord) {
            let recordData = await fetchRecord(this.props.idRecord,this.props.resource);
            this.setState({...recordData});
        }
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({
            idAreas:nextProps.idRecord
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
            <ModalHeader toggle={() => this.props.toggleModal()}>{this.props.idRecord ? 'Actualizar' : 'Crear'} Area</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.state.idRecord ? updateRecord(this.state) : storeRecord(this.state)}>
                    <FormGroup>
                        <Input type="text" name="nombre" id="" placeholder="Nombre"
                               value={this.props.idRecord ? this.state.nombre : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="textarea" name="descripcion" id="" placeholder="Descripción"
                               value={this.props.idRecord ? this.state.descripcion : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="area" id="" placeholder="Area"
                               value={this.props.idRecord ? this.state.area : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    {/*<FormGroup>
                        <Input type="number" name="idCondominio" id="" placeholder="Condominio"
                               value={this.props.idRecord ? this.state.idCond : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>*/}
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Condominio</label>
                                <Select options={optionsidCondominio}
                                        name="idCondominio"
                                        value={optionsidCondominio.find(op => {
                                            return op.value == this.state.idCondominio
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
                <Button onClick={this.props.idRecord ? updateRecord(this.state,this.props.resource,this.props.idRecord) : storeRecord(this.state,this.props.resource)} type="button" color="primary">{this.props.idRecord ? 'Actualizar ' : 'Crear '} Area</Button>            </ModalFooter>
        </Modal>);
    }

};