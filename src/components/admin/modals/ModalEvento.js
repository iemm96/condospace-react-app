import React, {useState, useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import {storeRecord} from "../../../actions/storeRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {fetchRecord} from "../../../actions/fetchRecord";

import {url_base} from "../../../constants/api_url";
const api_url = url_base;

const RESOURCE = 'eventos';

export default class ModalEvento extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

        //if edit mode fetch record data
        if(this.props.idEditRecord) {
            var data = fetchRecord(this.props.idEditRecord, RESOURCE);

            if(data) {
                this.setState({...data});
            }
        };
    }

    handleInputChange = event => {

        console.log(event);
        debugger;
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]:value
        });
    }

    render() {

        return (<Modal isOpen={this.props.modalRecord} toggle={() => this.props.toggleModal()} className={this.props.className}>
                <ModalHeader toggle={() => this.props.toggleModal()}>Nuevo Evento</ModalHeader>
                <ModalBody>
                    <Form id="form"
                          onSubmit={this.props.idEditRecord ?  (e) => {updateRecord(e, this.state, RESOURCE)} : (e) => {storeRecord(e, this.state, RESOURCE)}}>
                        <FormGroup>
                            <Label>* Título</Label>
                            <Input  name="titulo"
                                    value={this.props.idEditRecord ? this.props.titulo : undefined}
                                    onChange={event => this.handleInputChange(event)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>* Título</Label>
                            <Input type="textarea"
                                   name="descripcion"
                                   value={this.props.idEditRecord ? this.props.descripcion : undefined}
                                   onChange={event => this.handleInputChange(event)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input type="select" name="id_visibilidad" id="">
                                <option value="1">Visible para todos</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Input type="select" name="id_importancia" id="">
                                <option value="1">Importante</option>
                                <option value="2">General</option>
                            </Input>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={{ size: 10 }}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" id="checkbox2" />{' '}
                                        Notificar por correo
                                    </Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={storeRecord(this.state)} color="primary">Crear Anuncio</Button>
                    <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
