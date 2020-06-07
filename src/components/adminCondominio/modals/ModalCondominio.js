import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";


let tiposImportancia = [];
let tiposVisibilidad = [];

const ModalCondominio = (props) => {
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
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Nuevo'} Condominio</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>*Nombre del Condominio</Label>
                            <Input className="form-control" type="text" name="nombreCondominio"
                                   value={props.idRecord ? props.nombreCondominio : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>*URL personalizada</Label>
                            <Input className="form-control" type="text"
                                   name="dominio"
                                   value={props.idRecord ? props.dominio : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
                <p className="divider">
                    Datos del domicilio
                    <hr/>
                </p>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>*Calle</label>
                            <Input className="form-control" type="text"
                                   name="calle"
                                   value={props.idRecord ? props.calle : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <FormGroup>
                            <label>*Número exterior</label>
                            <Input className="form-control" type="text"
                                   name="noExterior"
                                   value={props.idRecord ? props.noExterior : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <label>Número interior</label>
                            <Input className="form-control" type="text"
                                   name="noInterior"
                                   value={props.idRecord ? props.noInterior : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <label>*Código Postal</label>
                            <FormGroup>
                                <Input className="form-control" type="text"
                                       name="cp"
                                       value={props.idRecord ? props.cp : undefined}
                                       ref={register}/>
                            </FormGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>Entre Calle 1</label>
                            <Input className="form-control" type="text"
                                   name="entre1"
                                   value={props.idRecord ? props.entre1 : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>Entre Calle 2</label>
                            <Input className="form-control" type="text"
                                   name="entre2"
                                   value={props.idRecord ? props.entre2 : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <FormGroup>
                            <label>Ciudad</label>
                            <Input className="form-control" type="text"
                                   name="ciudad"
                                   value={props.idRecord ? props.ciudad : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <label>Municipio</label>
                            <Input className="form-control" type="text"
                                   name="municipio"
                                   value={props.idRecord ? props.municipio : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <label>Estado</label>
                            <Input className="form-control" type="text"
                                   name="estado"
                                   value={props.idRecord ? props.estado : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </ModalBody>
        <p className="center">Los campos marcados con * son obligatorios</p>

        <ModalFooter className="d-flex justify-content-around" >
                <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
                <Button form="form" type="submit" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Condominio</Button>
        </ModalFooter>
    </Modal>);
}

export default ModalCondominio;
