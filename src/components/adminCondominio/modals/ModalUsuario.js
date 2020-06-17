import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Col, Row } from 'reactstrap';
import Select from "react-select";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import {format, addWeeks, addMonths, addYears} from "date-fns";
import {fetchRecordsByParam} from "../../../actions/fetchRecordsByParam";
import {fetchRecords} from "../../../actions/fetchRecords";
import {useUsuario} from "../../../context/usuario-context";
import {store} from "react-notifications-component";
import {fetchRecord} from "../../../actions/fetchRecord";
import Spinner from "reactstrap/es/Spinner";

registerLocale("es", es);


const ModalUsuario = (props) => {
    //Importante
    const { register, handleSubmit } = useForm();
    const { idCondominio } = useUsuario();
    const [record,setRecord] = useState(null);
    const [disabledButton,setDisabledButton] = useState(false);
    const [idTipoUsuario,setIdTipoUsuario] = useState(false);
    const [unidades,setUnidades] = useState(false);
    const [idUnidad,setIdUnidad] = useState(false);
    const [password,setPassword] = useState(false);

    useEffect(() => {

        //Obtiene los datos del registro
        async function getRecord() {
            try {
                const resultadoRecord = await fetchRecord(props.idRecord,'usuarios');

                setIdTipoUsuario(resultadoRecord.idTipoUsuario);

                setRecord(resultadoRecord);
                setDisabledButton(false);

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
        data.idTipoUsuario = idTipoUsuario;

        if(idUnidad) {
            data.idUnidad = idUnidad;
        }

        data.password = password;

        if(record) {

            try {
                const response = await updateRecord(data,'usuarios',record.id);
                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha actualizado la cuota",
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
                    title: "Ocurrió un error al actualizar la cuota",
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

                const response = await storeRecord(data,'addUsuario');
                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha creado una nueva cuota",
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
                console.log(e);
                store.addNotification({
                    title: "Ocurrió un error al agregar la cuota",
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

    const tiposUsuario = [
        {value:2,label:'Administrador del condominio',name:'idTipoUsuario'},
        {value:3,label:'Residente',name:'idTipoUsuario'},
        {value:4,label:'Vigilante',name:'idTipoUsuario'}
    ];

    const getUnidades = async () => {
        try {
            const resultadoUnidades = await fetchRecords(`unidades/getRecords/${idCondominio}`);

            let opcionesUnidades = [];

            if(resultadoUnidades) {
                resultadoUnidades.map((val) => {
                    opcionesUnidades.push({value:val.idUnidad,label:val.nombre,name:'idUnidad'});
                });

                setUnidades(opcionesUnidades);
            }

        }catch (e) {
            console.log(e);
        }
    };

    const handleTipoUsuarioChange = (idTipo) => {
        setIdTipoUsuario(idTipo);

        switch (idTipo) {
            case 2: {
                setPassword('admin_condominio');
                break;
            }
            case 3: {
                setPassword('residente_condominio');
                break;
            }
            case 4: {
                setPassword('vigilante_condominio');
                break;
            }
        }
    };

    const selectUnidad = () => {

        if(!unidades) {
            getUnidades();
        }

        return (
            <Row >
                <Col sm={8}>
                    <FormGroup>
                        {unidades ? (<div className="animate one fadeIn" style={{zIndex:2000,position:'relative'}}>
                                <label>* Unidad del residente</label>
                                <Select styles={customStyles}
                                        options={unidades}
                                        placeholder="Selecciona ..."
                                        defaultValue={unidades.find(op => {
                                            return op.value === idUnidad
                                        })}
                                        onChange={(event) => {
                                            setIdUnidad(event.value)
                                        }}
                                />
                            </div>
                            ) :
                            <div className="text-center">
                                <Spinner color="dark"/>
                            </div>
                            }

                    </FormGroup>
                </Col>
            </Row>
        )


    };

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Usuario</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <label>* Nombre</label>
                            <input className="form-control" type="text" name="name" id="" placeholder="Nombre"
                                   defaultValue={record ? record.name : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <label>* Apellidos</label>
                            <input className="form-control" type="text" name="apellidos" id="" placeholder="Apellidos"
                                   defaultValue={record ? record.apellidos : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>* Teléfono</Label>
                            <input className="form-control" type="text" name="telefono" id="" placeholder="Telefono"
                                   defaultValue={record ? record.telefono : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>* Email</Label>
                            <input className="form-control" type="text" name="email" id="" placeholder="Email"
                                   defaultValue={record ? record.email : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup style={{zIndex:3000,position:'relative'}}>
                            <label>* Tipo de usuario</label>
                            <Select styles={customStyles}
                                    options={tiposUsuario}
                                    placeholder="Selecciona ..."
                                    defaultValue={tiposUsuario.find(op => {
                                        return op.value === idTipoUsuario
                                    })}
                                    onChange={(event) => {handleTipoUsuarioChange(event.value)}}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                {idTipoUsuario === 3 ? selectUnidad() : ''}
                {password ? <p className="animate fadeIn one">
                    La contraseña por defecto es <b>{password}</b> <br/>
                    Podrá cambiarla la primera vez que inicie sesión
                </p> : ''}

            </Form>
        </ModalBody>
        <p className="center">Los campos marcados con * son obligatorios</p>
        <ModalFooter className="d-flex justify-content-around">
            <Button className="neutralButton" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button className="confirmButton" type="submit" form="form" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Usuario</Button>
        </ModalFooter>
    </Modal>);
};

export default ModalUsuario;



