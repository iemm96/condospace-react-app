import React, { userecord, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";

let idCuenta = [];
let idPersona = [];
let idCategoria = [];

const ModalFinanzas = (props) => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
        try{

            const response = await storeRecord(data,'register');
            console.log(response);
        }catch (e) {
            console.log(e);
        }
    }

    let optionsCuenta = [];
    let optionsPersona = [];
    let optionsCategoria = [];

    idCuenta.map((val) => {
        optionsCuenta.push({value:val.id,label:val.Cuenta,name:'id_Cuenta'});
    });

    idPersona.map((val) => {
        optionsPersona.push({value:val.id,label:val.Persona,name:'id_Persona'});
    });

    idCategoria.map((val) => {
        optionsCategoria.push({value:val.id,label:val.Categoria,name:'id_Categoria'});
    });

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Finanzas</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <input className="form-control" type="date" name="fechaTransaccion" id="" placeholder="Fecha de transaccion"
                           value={props.idRecord ? props.titulo : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="textarea" name="descripcion" id="" placeholder="Descripción"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="number" name="ingresooEgreso" id="" placeholder="Ingreso o Egreso"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="number" name="monto" id="" placeholder="Monto"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" name="saldo" id="" placeholder="Saldo"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="number" name="moneda" id="" placeholder="Moneda"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="number" name="formadePago" id="" placeholder="Forma de pago"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <input className="form-control" type="text" name="referencia" id="" placeholder="Referencia"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <Row form>
                    <Col>
                        <FormGroup>
                            <label>Cuenta</label>
                            <Select options={optionsCuenta}
                                    name="id_Cuenta"
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
                                    name="id_Persona"
                                    ref={register}>
                            </Select>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col>
                        <FormGroup>
                            <label>Categoria</label>
                            <Select options={optionsCategoria}
                                    name="id_Categoria"
                                    ref={register}>
                            </Select>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button form="form" type="submit" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Finanzas</Button>
        </ModalFooter>
    </Modal>);
}

export default ModalFinanzas;
