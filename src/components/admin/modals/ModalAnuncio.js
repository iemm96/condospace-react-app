import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import {url_base} from '../constants/api_url';

const api_url = url_base;
export default class ModalAnuncio extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            nombre: undefined,
            apellidoP: undefined,
            apellidoM: undefined,
            membresias: [],
        }
    }

    componentDidMount() {
        fetch(`${api_url}anuncios`, {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }

            }).then(response =>
            this.setState({membresias: response})
        );
    }

    render() {
        let membresias = this.state.membresias;

        let optionItems = membresias.map((membresia) => {
            console.log(membresia.id);
            return <option key={membresia.id} value={membresia.id}>{membresia.membresia}</option>
        });

        return(<Modal isOpen={this.props.modalRegister} toggle={() => this.props.toggleModal(1)} className={this.props.className}>
            <ModalHeader toggle={() => this.props.toggleModal(1)}>{this.props.editMode ? 'Editar' : 'Nuevo'} Anuncio</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.props.editMode ? this.props.handleEditRegister : this.props.handleNewRegister}>
                    <FormGroup>
                        <Input type="text" name="titulo" id="" placeholder="Título"
                               value={this.props.editMode ? this.props.titulo : undefined}
                               onChange={event => this.props.handleInputChange(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="textarea" name="mensaje" id="" placeholder="Descripción"
                               value={this.props.editMode ? this.props.mensaje : undefined}
                               onChange={event => this.props.handleInputChange(event)}/>
                    </FormGroup>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Visibilidad</label>
                                <Input type="select" name="id_visibilidad" value={this.props.id_visibilidad} onChange={this.props.handleInputChange}>
                                    {optionItems}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Importancia</label>
                                <Input type="select" name="id_nivelImportancia" value={this.props.id_nivelImportancia} onChange={this.props.handleInputChange}>
                                    {optionItems}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup row>
                        <Col sm={{ size: 10 }}>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="notificarEmail" id="checkbox2" />{' '}
                                    Notificar por correo
                                </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal(1)}>Cancelar</Button>
                <Button form="form" type="submit" color="primary">{this.props.editMode ? 'Editar ' : 'Agregar '} Anuncio</Button>
            </ModalFooter>
        </Modal>);
    }

};
