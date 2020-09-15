import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';

import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";
import {store} from "react-notifications-component";

export const ModalCondominio = (props) => {
    const { register, handleSubmit } = useForm();
    const [record,setRecord] = useState(null);

    useEffect(() => {
        async function getRecord() {
            try {
                const result = await fetchRecord(props.idRecord,'condominios');

                if(result) {

                    setRecord(result);
                }
            }catch (e) {
                console.log(e);
            }
        }

        if(props.idRecord) {
            getRecord();
        }
    },[props.idRecord]);

    const onSubmit = async data => {
        console.log(data);

        if(record) {
            try {
                const response = await updateRecord(data,'condominios',props.idRecord);


                store.addNotification({
                    title: "Correcto",
                    message: "Se ha actualizado el condominio",
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
                props.update();
            }catch (e) {
                console.log(e);
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
        }else {
            try {

                const response = await storeRecord(data,'condominios',props.idRecord);

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
                props.update();
            }catch (e) {
                console.log(e);
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

    };

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{record ? 'Actualizar' : 'Nuevo'} Condominio</ModalHeader>
        <ModalBody>
            <Form id="form"  onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>*Nombre del Condominio</Label>
                            <input class="form-control" type="text"
                                   name="nombreCondominio"
                                   defaultValue={record ? record.nombreCondominio : undefined}
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
                                   defaultValue={record ? record.dominio : undefined}
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
                                   defaultValue={record ? record.calle : undefined}
                                   ref={register({ required: true })}
                                   />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <label>*Número exterior</label>
                            <input class="form-control" type="text"
                                   name="noExterior"
                                   ref={register({ required: true })}
                                   defaultValue={record ? record.noExterior : undefined}
                                   />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <label>*Código Postal</label>
                            <FormGroup>
                                <input class="form-control" type="text"
                                       name="cp"
                                       defaultValue={record ? record.cp : undefined}
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
                                   defaultValue={record ? record.entre1 : undefined}
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
                                   defaultValue={record ? record.entre2 : undefined}
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
                                   defaultValue={record ? record.ciudad : undefined}
                                   />
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <label>Municipio</label>
                            <input class="form-control" type="text"
                                   name="municipio"
                                   defaultValue={record ? record.municipio : undefined}
                                   ref={register}
                                   />
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <label>Estado</label>
                            <input class="form-control" type="text"
                                   name="estado"
                                   defaultValue={record ? record.estado : undefined}
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
            <Button className="confirmButton" form="form" type="submit">{record ? 'Editar ' : 'Crear '} Condominio</Button>
        </ModalFooter>
    </Modal>);

} 

