import React, { useprops, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";
import ModalFinanzas from "./ModalFinanzas";

let idCondominio = [];

const ModalCuenta = (props) => {
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await storeRecord(data, 'register');
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    let optionsidCondominio = [];

    idCondominio.map((val) => {
        optionsidCondominio.push({value:val.id,label:val.idCondominio,name:'idCondominio'});
    });

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Anuncio</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Input type="text" name="nombre" id="" placeholder="Nombre"
                           value={props.idRecord ? props.titulo : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="cuenta" id="" placeholder="Cuenta"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="clabe" id="" placeholder="Clabe"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="swift" id="" placeholder="Swift"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="sucursal" id="" placeholder="Sucursal"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input type="number" name="tipoBanco" id="" placeholder="Tipo de Banco"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
                <Row form>
                    <Col>
                        <FormGroup>
                            <label>Condominio</label>
                            <Select options={optionsidCondominio}
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
            <Button form="form" type="submit" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Anuncio</Button>
        </ModalFooter>
    </Modal>);    
}

export default ModalCuenta;