import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";

let tipoUnidad = [];
let personas = [];
let condominios = [];
let optionsTipoUnidad = [];
let optionsPersona = [];
let optionsCondominio = [];

const ModalUnidad = (props) => {
    const { register, handleSubmit, errors } = useForm();

    const [record,setRecord] = useState(null);
    
    const onSubmit = () => {
        
    };
    
    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Unidad</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <input className="form-control" type="text" name="nombre" id="" placeholder="Nombre"
                           value={props.idRecord ? record.nombre : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" name="calle" id="" placeholder="Calle"
                           value={props.idRecord ? record.calle : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" name="noExterior" id="" placeholder="Numero Exterior"
                           value={props.idRecord ? record.noExterior : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" name="noInterior" id="" placeholder="Numero Interior"
                           value={props.idRecord ? record.noInterior : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" name="entre1" id="" placeholder="Entre Calle "
                           value={props.idRecord ? record.entre1 : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" name="entre2" id="" placeholder="y Calle"
                           value={props.idRecord ? record.entre2 : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" name="mts2" id="" placeholder="Metros Cuadrados"
                           value={props.idRecord ? record.mts2 : undefined}
                           ref={register}/>
                </FormGroup>
                <Row form>
                    <Col>
                        <FormGroup>
                            <label>Tipo de Unidad</label>
                            <Select options={optionsTipoUnidad}
                                    name="tipoUnidad"
                                    ref={register}>
                            </Select>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col>
                        <FormGroup>
                            <label>Persona</label>
                            <Select options={optionsPersona}
                                    name="idPersona"
                                    ref={register}>
                            </Select>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col>
                        <FormGroup>
                            <label>Codominio</label>
                            <Select options={optionsCondominio}
                                    name="idCondominio"
                                    ref={register}>
                            </Select>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button form="form" type="button" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Unidad</Button>
        </ModalFooter>
    </Modal>);
};

export default ModalUnidad;


