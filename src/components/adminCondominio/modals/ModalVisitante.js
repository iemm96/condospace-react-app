import React, { useprops, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";

let unidades = [];
let optionsUnidades = [];

const ModalVisitante = (props) => {
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await storeRecord(data, 'register');
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    const optionsVisitante = [
        { value: 1, label: 'Servicio' },
        { value: 2, label: 'Personal' }

    ];

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Visitante</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <Row form>
                    <Col>
                        <FormGroup>
                            <label>Tipo de Visitante</label>
                            <Select options={optionsVisitante}
                                    name="tipoVisitante"
                                    ref={register}>
                            </Select>
                        </FormGroup>
                    </Col>
                </Row>


                <FormGroup>
                    <Input type="text" name="nombre" id="" placeholder="Nombre"
                           value={props.idRecord ? props.nombre : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="apellidos" id="" placeholder="Apellidos"
                           value={props.idRecord ? props.apellidos : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="detalle" id="" placeholder="Motivo de la visita"
                           value={props.idRecord ? props.detalle : undefined}
                           ref={register}/>
                </FormGroup>

                <FormGroup>
                    <Input type="text" name="noIdentificacion" id="" placeholder="Numero de identificacion"
                           value={props.idRecord ? props.noIdentificacion : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="date" name="fechaLlegada" id="" placeholder="Fecha de llegada"
                           value={props.idRecord ? props.fechaLlegada : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="date" name="fechaSalida" id="" placeholder="Fecha de Salida"
                           value={props.idRecord ? props.fechaSalida : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup >
                    <Input type="number" name="noVisitantes" id="" placeholder="Numero de Visitantes"
                           value={props.idRecord ? props.noVisitantes : undefined}
                           ref={register}/>
                </FormGroup>
                <Row form>
                    <Col>
                        <FormGroup>
                            <label>Unidad a visitar</label>
                            <Select options={optionsUnidades}
                                    name="idUnidad"
                                    ref={register}>
                            </Select>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button form="form" type="button" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Visitante</Button>
        </ModalFooter>
    </Modal>);

}

export default ModalVisitante;
