import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";

export default class ModalAreasComunes extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id:this.props.idRecord
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
            <ModalHeader toggle={() => this.props.toggleModal()}>{this.props.idRecord ? 'Actualizar' : 'Crear'} Evento</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.state.idRecord ? updateRecord(this.state) : storeRecord(this.state)}>
                    <FormGroup>
                        <Input type="text" name="npmbre" id="" placeholder="Nombre"
                               value={this.props.idRecord ? this.state.titulo : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="textarea" name="descripcion" id="" placeholder="Descripción"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="area" id="" placeholder="Area"
                               value={this.props.idRecord ? this.state.mensaje : undefined}
                               onChange={event => this.handleInputChange(event)}/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancelar</Button>
                <Button form="form" type="submit" color="primary">{this.props.idRecord ? 'Actualizar ' : 'Crear '} Evento</Button>
            </ModalFooter>
        </Modal>);
    }

};
