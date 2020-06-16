import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Col, Row } from 'reactstrap';

import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";
import {store} from "react-notifications-component";

export const ModalUsuario = (props) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        data.idTipoUsuario = 2;
        data.idCondominio = props.idCondominio;
        data.password = 'admin_condominio';
        console.log(data);
        
        try {
            const response = await storeRecord(data,'register');

            if(response) {
                store.addNotification({
                    title: "Correcto",
                    message: "Se ha creado un nuevo usuario",
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
            }

        }catch (e) {
            console.log(e);
            store.addNotification({
                title: "Ocurrió un error al agregar el usuario",
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

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
            <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Nuevo'} Usuario Administrador</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col sm={8}>
                            <FormGroup>
                                <Label>*Nombre completo</Label>
                                <input class="form-control" type="text" name="name" id="" placeholder=""
                                       value={props.idRecord ? props.name : undefined}
                                       ref={register}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <Label>*Email</Label>
                                <input class="form-control" type="text" name="email" id=""
                                       value={props.idRecord ? props.email : undefined}
                                       ref={register}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <Label>Teléfono</Label>
                                <input class="form-control" type="text" name="telefono" id=""
                                       value={props.idRecord ? props.telefono : undefined}
                                       ref={register}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                <p className="justify-content-start">La contraseña por defecto es admin_condominio</p>
            </ModalBody>
            <p className="center">Los campos marcados con * son obligatorios</p>
            <ModalFooter className="d-flex justify-content-around">
                <Button className="neutralButton" onClick={() => props.toggleModal()}>Cancelar</Button>
                <Button className="confirmButton" type="submit" form="form" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Usuario</Button>
            </ModalFooter>

</Modal>);

};
