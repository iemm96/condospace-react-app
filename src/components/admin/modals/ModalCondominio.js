import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';

import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";
import {store} from "react-notifications-component";

export const ModalCondominio = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = async data => {
        console.log(data);
        try {
            const response = await storeRecord(data,'condominios');

            store.addNotification({
                title: "Correcto",
                message: "Se ha creado un nuevo condominio",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
            props.toggleModal();

        }catch (e) {
            store.addNotification({
                title: "Ocurrió un error al agregar el condominio",
                message: "Revisa tu conexión a internet",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
    }

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Nuevo'} Condominio</ModalHeader>
        <ModalBody>
            <Form id="form"  onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>*Nombre del Condominio</Label>
                            <input class="form-control" type="text"
                                   name="nombreCondominio"
                                   value={props.idRecord ? props.nombreCondominio : undefined}
                                   ref={register({ required: true })}
                                   />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>*URL personalizada</Label>
                            <input class="form-control" type="text"
                                   name="dominio"
                                   value={props.idRecord ? props.dominio : undefined}
                                   ref={register({ required: true })}
                                   />
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
                            <input class="form-control" type="text"
                                   name="calle"
                                   value={props.idRecord ? props.calle : undefined}
                                   ref={register({ required: true })}
                                   />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <FormGroup>
                            <label>*Número exterior</label>
                            <input class="form-control" type="text"
                                   name="noExterior"
                                   ref={register({ required: true })}
                                   value={props.idRecord ? props.noExterior : undefined}
                                   />
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <label>Número interior</label>
                            <input class="form-control" type="text"
                                   name="noInterior"
                                   ref={register}
                                   value={props.idRecord ? props.noInterior : undefined}
                                   />
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <label>*Código Postal</label>
                            <FormGroup>
                                <input class="form-control" type="text"
                                       name="cp"
                                       value={props.idRecord ? props.cp : undefined}
                                       ref={register({ required: true })}
                                       />
                            </FormGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>Entre Calle 1</label>
                            <input class="form-control" type="text"
                                   name="entre1"
                                   value={props.idRecord ? props.entre1 : undefined}
                                   ref={register}
                                   />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>Entre Calle 2</label>
                            <input class="form-control" type="text"
                                   name="entre2"
                                   value={props.idRecord ? props.entre2 : undefined}
                                   ref={register}
                                   />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <FormGroup>
                            <label>Ciudad</label>
                            <input class="form-control" type="text"
                                   name="ciudad"
                                   value={props.idRecord ? props.ciudad : undefined}
                                   />
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <label>Municipio</label>
                            <input class="form-control" type="text"
                                   name="municipio"
                                   value={props.idRecord ? props.municipio : undefined}
                                   ref={register}
                                   />
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <label>Estado</label>
                            <input class="form-control" type="text"
                                   name="estado"
                                   value={props.idRecord ? props.estado : undefined}
                                   ref={register}
                                   />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </ModalBody>
        <p className="center">Los campos marcados con * son obligatorios</p>

        <ModalFooter className="d-flex justify-content-around" >
            <Button className="neutralButton" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button className="confirmButton" form="form" type="submit">{props.idRecord ? 'Actualizar ' : 'Crear '} Condominio</Button>
        </ModalFooter>
    </Modal>);

} 

