import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";


import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";

let idCondominio = [];

const ModalCategoria = (props) => {
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
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Anuncio</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Input className="form-control" type="text" name="nombre" id="" placeholder="Nombre"
                           value={props.idRecord ? props.titulo : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Input className="form-control" type="textarea" name="descripcion" id="" placeholder="Descripcion"
                           value={props.idRecord ? props.mensaje : undefined}
                           ref={register}/>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button form="form" type="submit" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Anuncio</Button>
        </ModalFooter>
    </Modal>);
}

export default ModalCategoria;
