import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Col, Row } from 'reactstrap';
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
    };

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Nuevo'} Anuncio</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label>* Titulo </Label>
                    <input className="form-control" type="text" name="titulo" id="" placeholder=""
                           value={props.idRecord ? props.titulo : undefined}
                           ref={register({required:true})}/>
                </FormGroup>
                <FormGroup>
                    <Label>* Descripcion </Label>
                    <input className="form-control" type="textarea" name="mensaje" id="" placeholder=""
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register({required:true})}/>
                </FormGroup>
                <Row form>
                    <Col>
                        <FormGroup>
                            <label>* Visibilidad</label>
                            <Select options={optionsVisibilidad}
                                    name="idTipoVisibilidad"
                                    value={optionsVisibilidad.find(op => {
                                        return op.value == props.idTipoVisibilidad
                                    })}
                                    ref={register({required:true})}>
                            </Select>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col>
                        <FormGroup>
                            <label>* Importancia</label>
                            <Select options={optionsImportancia}
                                    name="idTipoImportancia"
                                    value={optionsImportancia.find(op => {
                                        return op.value == props.idTipoImportancia
                                    })}
                                    ref={register({required:true})}>
                            </Select>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup row>
                    <Col sm={{ size: 10 }}>
                        <FormGroup check>
                            <Label check>
                                Notificar por correo <input className="form-control" type="checkbox" name="notificarEmail"  value="1" id="checkbox2"
                                       ref={register({required:true})}
                                />
                            </Label>
                        </FormGroup>
                    </Col>
                </FormGroup>
            </Form>
        </ModalBody>
        <p className="center">Los campos marcados con * son obligatorios</p>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button form="form" type="submit" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Anuncio</Button>
        </ModalFooter>
    </Modal>);
}

export default ModalAnuncio;
