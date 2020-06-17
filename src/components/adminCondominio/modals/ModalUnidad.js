import React, { useState, useEffect } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Col, Row, Label} from 'reactstrap';
import Select from "react-select";

import {useForm} from "react-hook-form";
import {storeRecord} from "../../../actions/storeRecord";
import {store} from "react-notifications-component";
import {useUsuario} from "../../../context/usuario-context";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";

const ModalUnidad = (props) => {
    const { register, handleSubmit } = useForm();
    const { idCondominio } = useUsuario();
    const [tipoUnidad,setTipoUnidad] = useState(null);
    const [record,setRecord] = useState(null);

    useEffect(() => {

        //Obtiene los datos del registro
        async function getRecord() {
            try {
                const resultadoRecord = await fetchRecord(props.idRecord,'unidades');

                setTipoUnidad(resultadoRecord.tipoUnidad);

                setRecord(resultadoRecord);

            }catch (e) {
                console.log(e);
            }
        }

        if(props.idRecord) {
            getRecord();
        }
    }, [props.idRecord]);

    useEffect(() => {
        return () => {
            console.log("cleaned up");
        };
    });


    const onSubmit = async data => {
        data.idCondominio = idCondominio;
        data.tipoUnidad = tipoUnidad;
        console.log(data);

        try {

            if(record) {
                const response = await updateRecord(data,'unidades',props.idRecord);

                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha actualizado la unidad",
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
            }else{
                const response = await storeRecord(data,'unidades');

                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha actualizado la unidad",
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
            }



        }catch (e) {
            console.log(e);
            store.addNotification({
                title: "Ocurrió un error al agregar la unidad",
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

    const tiposUnidad = ([
        {value:1,label:'Casa',name:'tipoUnidad'},
        {value:2,label:'Departamento',name:'tipoUnidad'}
    ]);
    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Unidad</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>* Nombre de la unidad</Label>
                            <input className="form-control" type="text" name="nombre" id="" placeholder=""
                                   defaultValue={record ? record.nombre : undefined}
                                   ref={register({required:true})}/>
                        </FormGroup>
                    </Col>
                </Row>
                <p className="divider">
                    Dirección
                    <hr/>
                </p>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>Calle</Label>
                            <input className="form-control" type="text" name="calle" id="" placeholder=""
                                   defaultValue={record ? record.calle : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <FormGroup>
                            <Label>* Número Exterior</Label>
                            <input className="form-control" type="text" name="noExterior" id="" placeholder=""
                                   defaultValue={record ? record.noExterior : undefined}
                                   ref={register({required:true})}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <FormGroup>
                            <Label>Tipo de unidad</Label>
                            <Select styles={customStyles}
                                    options={tiposUnidad}
                                    value={tiposUnidad.find(op => {
                                        return op.value === tipoUnidad
                                    })}
                                    placeholder="Selecciona..."
                                    onChange={(event) => {setTipoUnidad(event.value)}}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </ModalBody>
        <p className="center">Los campos marcados con * son obligatorios</p>
        <ModalFooter className="d-flex justify-content-around">
            <Button className="neutralButton" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button className="confirmButton" type="submit" form="form" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Unidad</Button>
        </ModalFooter>
    </Modal>);

};

export default ModalUnidad;


