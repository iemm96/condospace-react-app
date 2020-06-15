import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Col, Row } from 'reactstrap';
import Select from "react-select";

import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";
import {useUsuario} from "../../../context/usuario-context";
import {store} from "react-notifications-component";

const ModalCuenta = (props) => {
    const { register, handleSubmit } = useForm();
    const { idCondominio } = useUsuario();
    const [tipoCuenta,setTipoCuenta] = useState(0);
    const [tipoBanco,setTipoBanco] = useState([]);
    const [record,setRecord] = useState(null);
    const [disabledButton] = useState(false);

    useEffect(() => {
        return () => {
            console.log("cleaned up");
        };
    },[]);

    useEffect(() => {
        return () => {
            console.log("updated");
        };
    },[tipoCuenta]);

    const onSubmit = async (data) => {
        data.idCondominio = idCondominio;
        if(record) {

            try {

                const response = await updateRecord(data,'cuentas',record.idCuenta);

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
                const response = await storeRecord(data,'cuentas');
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

    const tiposBancos = [
        {value:1,label:'Banamex',name:'tipoBanco'},
        {value:2,label:'Bancomer',name:'tipoBanco'},
        {value:3,label:'HSBC',name:'tipoBanco'},
        {value:4,label:'Banco Azteca',name:'tipoBanco'},
        {value:5,label:'BanCoppel',name:'tipoBanco'},
    ];

    const sectionBancaria = (
        <div>
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label>* No. de cuenta (Últimos 4 números)</Label>
                        <input className="form-control" type="text" name="noCuenta" id="" placeholder=""
                               defaultValue={record ? record.noCuenta : undefined}
                               ref={register({required:true})}/>
                    </FormGroup>
                </Col>

            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label>* Banco</Label>
                        <Select styles={customStyles}
                                options={tiposBancos}
                                placeholder="Selecciona ..."
                                value={tiposBancos.find(op => {
                                    return op.value === tipoBanco
                                })}
                                onChange={(event) => {setTipoBanco(event.value)}}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={8}>
                    <FormGroup>
                        <Label>Nombre Titular</Label>
                        <input className="form-control" type="text" name="nombreTitular" id="" placeholder=""
                               defaultValue={record ? record.nombreTitular : undefined}
                               ref={register}/>
                    </FormGroup>
                </Col>
            </Row>
        </div>
    );


    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Transacción</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>* Nombre</Label>
                            <input className="form-control" type="text" name="nombre" id="" placeholder=""
                                   defaultValue={record ? record.nombre : undefined}
                                   ref={register({required:true})}/>
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <Label>* Total</Label>
                            <input className="form-control" type="number" name="total" id="" placeholder=""
                                   defaultValue={record ? record.total : undefined}
                                   ref={register({required:true})}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <label>* ¿Es cuenta bancaria?</label>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio"
                                       value="1"
                                       className="custom-control-input"
                                       id="radioSi"
                                       defaultChecked={tipoCuenta === 1}
                                       name="esBancaria"
                                       ref={register}
                                       onChange={() => setTipoCuenta(1)}
                                />
                                <label className="custom-control-label" htmlFor="radioSi">Si</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio"
                                       value="0"
                                       className="custom-control-input"
                                       id="radioNo"
                                       name="esBancaria"
                                       ref={register}
                                       defaultChecked={tipoCuenta === 0}
                                       onChange={() => setTipoCuenta(0)}
                                />
                                <label className="custom-control-label" htmlFor="radioNo">No</label>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                {tipoCuenta === 1 ? sectionBancaria : ''}
            </Form>
        </ModalBody>
        <p className="center">Los campos marcados con * son obligatorios</p>
        <ModalFooter className="d-flex justify-content-around">
            <Button className="neutralButton" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button className="confirmButton" type="submit" disabled={disabledButton} form="form" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Transacción</Button>
        </ModalFooter>
    </Modal>);
}

export default ModalCuenta;