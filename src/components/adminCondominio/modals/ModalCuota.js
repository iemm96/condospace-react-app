import React, { useprops, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";
import ModalFinanzas from "./ModalFinanzas";

let optionsTipoCuota = []

const ModalCuota = (props) => {
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
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Cuota</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Input type="text" name="nombre" id="" placeholder="Nombre"
                           value={props.idRecord ? props.nombre : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="date" name="fechaIni" id="" placeholder="Fecha de Inicio"
                           value={props.idRecord ? props.fechaIni : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="date" name="fechafin" id="" placeholder="Fecha Fin"
                           value={props.idRecord ? props.fechaFin : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="decimal" name="monto" id="" placeholder="Monto"
                           value={props.idRecord ? props.monto : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="number" name="periodo" id="" placeholder="Periodo (en meses)"
                           value={props.idRecord ? props.periodo : undefined}
                           ref={register}/>
                </FormGroup>
                <Row form>
                    <Col>
                        <FormGroup>
                            <label>Tipo de Cuota</label>
                            <Select options={optionsTipoCuota}
                                    name="tipoCuota"
                                    value={optionsTipoCuota.find(op => {
                                        return op.value == props.tipoCuota
                                    })}
                                    ref={register}>
                            </Select>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button form="form" type="button" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Cuota</Button>
        </ModalFooter>
    </Modal>);
}

export default ModalCuota;