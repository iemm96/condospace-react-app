import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";

let idCondominio = [];

export default class ModalAnuncio extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
        try {
            idCondominio = await fetchRecords('condominios');
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

        let optionsidCondominio = [];

        idCondominio.map((val) => {
            optionsidCondominio.push({value:val.id,label:val.idCondominio,name:'idCondominio'});
        });

        console.log(this.state.titulo);

        return(<Modal isOpen={this.props.recordModal} toggle={() => this.props.toggleModal()}>
            <ModalHeader toggle={() => this.props.toggleModal()}>{this.props.idRecord ? 'Actualizar' : 'Crear'} Anuncio</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.state.idRecord ? updateRecord(this.state) : storeRecord(this.state)}>
                    <FormGroup>
                        <Input type="text" name="nombre" id="" placeholder="Nombre"
                               value={this.props.idRecord ? this.state.titulo : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="date" name="fechaInicio" id="" placeholder="Fecha de Inicio"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="date" name="fechafin" id="" placeholder="Fecha Fin"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="decimal" name="monto" id="" placeholder="Monto"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" name="periodo" id="" placeholder="Periodo"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" name="tipoCuota" id="" placeholder="Tipo de Cuota"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancelar</Button>
                <Button onClick={this.props.idRecord ? updateRecord(this.state,this.props.resource,this.props.idRecord) : storeRecord(this.state,this.props.resource)} type="button" color="primary">{this.props.idRecord ? 'Actualizar ' : 'Crear '} Anuncio</Button>
            </ModalFooter>
        </Modal>);
    }

};
