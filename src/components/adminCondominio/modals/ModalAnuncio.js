import React, { useState, useEffect } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Col, Row, Input} from 'reactstrap';
import Select from "react-select";

import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";
import {useUsuario} from "../../../context/usuario-context";
import {store} from "react-notifications-component";
import {fetchRecord} from "../../../actions/fetchRecord";

const ModalCuenta = (props) => {
    const { register, handleSubmit } = useForm();
    const { idCondominio } = useUsuario();
    const [idTipoImportancia,setIdTipoImportancia] = useState([]);
    const [record,setRecord] = useState(null);

    useEffect(() => {

        //Obtiene los datos del registro
        async function getRecord() {
            try {
                const resultadoRecord = await fetchRecord(props.idRecord,'anuncios');

                setIdTipoImportancia(resultadoRecord.idTipoImportancia);

                setRecord(resultadoRecord);

            }catch (e) {
                console.log(e);
            }
        }

        if(props.idRecord) {
            getRecord();
        }
    }, [props.idRecord]);


    const onSubmit = async (data) => {
        data.idCondominio = idCondominio;
        if(record) {

            try {

                const response = await updateRecord(data,'anuncios',record.idCuenta,idCondominio);

                console.log(response);
                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha actualizado la cuenta",
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
                    setRecord(null);

                    props.toggleModal();
                    props.updateRecords();
                }
            }catch (e) {
                console.log(e);
                store.addNotification({
                    title: "Ocurrió un error al actualizar la cuenta",
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

        }else{
            try {
                const response = await storeRecord(data,'anuncios',idCondominio);
                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha creado una nueva cuenta",
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
                    props.updateRecords();
                }


            }catch (e) {
                store.addNotification({
                    title: "Ocurrió un error al agregar la cuenta",
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
    };


    const customStyles = {

        control: () => ({
            borderRadius: 10,
            border: '1px solid #979797 !important',
            position: 'relative',
            justifyContent: 'space-between',
            display: '-webkit-flex'
        }),
        dropdownIndicator: () => ({
            color: 'black',
            marginRight: 10
        }),
        indicatorSeparator: () => ({
            border: 'none',
        })
    };

    const tiposImportancia = [
        {value:1,label:'Alta',name:'idTipoImportancia'},
        {value:2,label:'Media',name:'idTipoImportancia'},
        {value:3,label:'Baja',name:'idTipoImportancia'},
    ];

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Anuncio</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>* Título</Label>
                            <input className="form-control" type="text" name="titulo" id="" placeholder=""
                                   defaultValue={record ? record.titulo : undefined}
                                   ref={register({required:true})}/>
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>* Mensaje</Label>
                            <textarea className="form-control" type="textarea" name="mensaje" id="" placeholder=""
                                   value={props.idRecord ? props.mensaje : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>* Tipo de importancia</Label>
                            <Select styles={customStyles}
                                    options={tiposImportancia}
                                    placeholder="Selecciona ..."
                                    value={tiposImportancia.find(op => {
                                        return op.value === idTipoImportancia
                                    })}
                                    onChange={(event) => {setIdTipoImportancia(event.value)}}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </ModalBody>
        <p className="center">Los campos marcados con * son obligatorios</p>
        <ModalFooter className="d-flex justify-content-around">
            <Button className="neutralButton" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button className="confirmButton" type="submit" form="form" >{props.idRecord ? 'Actualizar ' : 'Crear '} Anuncio</Button>
        </ModalFooter>
    </Modal>);
}

export default ModalCuenta;