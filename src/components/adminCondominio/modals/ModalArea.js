import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";

let condominios = [];
let optionsidCondominio = [];

const ModalArea = (props) => {
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
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Registrar'} Area</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label>* Nombre </Label>
                    <Input className="form-control" type="text" name="nombre" id="" placeholder=""
                           value={props.idRecord ? props.nombre : undefined}
                           ref={register({required:true})}/>
                </FormGroup>
                <FormGroup>
                    <Input className="form-control" type="textarea" name="descripcion" id="" placeholder="Descripción"
                           value={props.idRecord ? props.descripcion : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input className="form-control" type="text" name="area" id="" placeholder="Area"
                           value={props.idRecord ? props.area : undefined}
                           ref={register}/>
                </FormGroup>
                {/*<FormGroup>
                    <Input className="form-control" type="number" name="idCondominio" id="" placeholder="Condominio"
                           value={props.idRecord ? props.idCondominio : undefined}
                           ref={register}/>
                </FormGroup>*/}
                <Row form>
                    <Col>
                        <FormGroup>
                            <label>Condominio</label>
                            <Select options={optionsidCondominio}
                                    name="idCondominio"
                                    value={optionsidCondominio.find(op => {
                                        return op.value == props.idCondominio
                                    })}
                                    ref={register({required:true})}>
                            </Select>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button form="form" type="submit" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Area</Button>
        </ModalFooter>
    </Modal>);
}

export default ModalArea;
