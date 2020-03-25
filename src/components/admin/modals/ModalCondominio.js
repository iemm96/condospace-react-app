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
            id:this.props.idRecord
        }
    }
    async componentWillReceiveProps(nextProps) {
        this.setState({
            idAnuncio:this.props.idRecord
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
            <ModalHeader toggle={() => this.props.toggleModal()}>{this.props.idRecord ? 'Actualizar' : 'Crear'} Condominio</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.state.idRecord ? updateRecord(this.state) : storeRecord(this.state)}>
                    <FormGroup>
                        <Input type="text" name="nombreCondominio" id="" placeholder="Nombre de la comunidad"
                               value={this.props.idRecord ? this.state.nombreCondominio : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="dominio" id="" placeholder="Ruta de dominio"
                               value={this.props.idRecord ? this.state.dominio : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <label>DIRECCION</label>
                        <Input type="text" name="calle" id="" placeholder="Calle"
                               value={this.props.idRecord ? this.state.calle : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="numeroExterior" id="" placeholder="No. Exterior"
                               value={this.props.idRecord ? this.state.numeroExterior : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="entre1" id="" placeholder="Entre calle 1"
                               value={this.props.idRecord ? this.state.entre1 : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="entre2" id="" placeholder="Entre calle 2"
                               value={this.props.idRecord ? this.state.entre2 : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="cp" id="" placeholder="Codigo Postal: 45054"
                               value={this.props.idRecord ? this.state.cp : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="ciudad" id="" placeholder="Ciudad"
                               value={this.props.idRecord ? this.state.ciudad : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="municipio" id="" placeholder="Municipio"
                               value={this.props.idRecord ? this.state.municipio : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="estado" id="" placeholder="Estado"
                               value={this.props.idRecord ? this.state.estado : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="pais" id="" placeholder="Pais"
                               value={this.props.idRecord ? this.state.pais : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>);
    };


};
