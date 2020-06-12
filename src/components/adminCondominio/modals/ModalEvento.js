import React, { useprops, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";

const ModalEvento = (props) => {
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = async (data) => {
        try {

            const response = await storeRecord(data, 'register');
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Evento</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Input type="text" name="nombre" id="" placeholder="Nombre"
                           value={props.idRecord ? props.titulo : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="textarea" name="mensaje" id="" placeholder="Descripción"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="date" name="fecha" id="" placeholder="Fecha"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup row>
                    <Col sm={{ size: 10 }}>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="aprobado" id="checkbox2" />{' '}
                                Aprobado
                            </Label>
                        </FormGroup>
                    </Col>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button form="form" type="submit" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Evento</Button>
        </ModalFooter>
    </Modal>);
}

export default ModalEvento;