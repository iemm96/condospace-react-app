import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";

let optionsImportancia = [];
let optionsVisibilidad = [];

const ModalAnuncio = (props) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        try {
            const response = await storeRecord(data,'register');
            console.log(response);
        }catch (e) {
            console.log(e);
        }
    }

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Anuncio</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <input className="form-control" type="text" name="titulo" id="" placeholder="Título"
                           value={props.idRecord ? props.titulo : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="textarea" name="mensaje" id="" placeholder="Descripción"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <Row form>
                    <Col>
                        <FormGroup>
                            <label>Visibilidad</label>
                            <Select options={optionsVisibilidad}
                                    name="idTipoVisibilidad"
                                    value={optionsVisibilidad.find(op => {
                                        return op.value == props.idTipoVisibilidad
                                    })}
                                    ref={register}>
                            </Select>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col>
                        <FormGroup>
                            <label>Importancia</label>
                            <Select options={optionsImportancia}
                                    name="idTipoImportancia"
                                    value={optionsImportancia.find(op => {
                                        return op.value == props.idTipoImportancia
                                    })}
                                    ref={register}>
                            </Select>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup row>
                    <Col sm={{ size: 10 }}>
                        <FormGroup check>
                            <Label check>
                                <input className="form-control" type="checkbox" name="notificarEmail"  value="1" id="checkbox2"
                                       ref={register}
                                />{' '}
                                Notificar por correo
                            </Label>
                        </FormGroup>
                    </Col>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button form="form" type="submit" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Anuncio</Button>
        </ModalFooter>
    </Modal>);
}

export default ModalAnuncio;
