import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

const NuevoAnuncio = ( props ) => {

    const {
        buttonLabel,
        className
    } = props;

    return(<Modal isOpen={props.modalAnuncio} toggle={() => props.toggleModal(1)} className={className}>
        <ModalHeader toggle={() => props.toggleModal(1)}>Nuevo Anuncio</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Input type="text" name="titulo" id="" placeholder="Título" />
                </FormGroup>
                <FormGroup>
                    <Input type="textarea" name="descripcion" id="" placeholder="Descripción"/>
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
            <Button color="primary" onClick={() => props.toggleModal(1)}>Crear Anuncio</Button>{' '}
            <Button color="secondary" onClick={() => props.toggleModal(1)}>Cancelar</Button>
        </ModalFooter>
    </Modal>);
};

export default NuevoAnuncio;