import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import {format} from "date-fns";
import {fetchRecordsByParam} from "../../../actions/fetchRecordsByParam";
import {fetchRecords} from "../../../actions/fetchRecords";
import {useUsuario} from "../../../context/usuario-context";
import {store} from "react-notifications-component";
import {fetchRecord} from "../../../actions/fetchRecord";
registerLocale("es", es);


const ModalCuota = (props) => {
    //Importante
    const { register, handleSubmit } = useForm();
    const { idCondominio } = useUsuario();
    const [recordState, setRecordState] = useState(props);
    const [selectedRecordId,setSelectedRecordId] = useState(props.idRecord);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [esRecurrente,setEsRecurrente] = useState(0);
    const [tipoCuota,setTipoCuota] = useState(null);
    const [tipoUnidad,setTipoUnidad] = useState(null);
    const [tipoCuenta,setTipoCuenta] = useState(null);
    const [tipoPeriodicidad,setTipoPeriodicidad] = useState([]);
    const [record,setRecord] = useState(null);
    const [unidades,setUnidades] = useState([]);
    const [cuentas,setCuentas] = useState([]);
    const [cuentasTotal,setCuentasTotal] = useState([]);
    const [total,setTotal] = useState(null);
    const [disabledButton,setDisabledButton] = useState(true);

    useEffect(() => {
        setRecordState(props);

        //Obtiene los datos del registro
        async function getRecord() {
            try {
                const resultadoRecord = await fetchRecord(props.idRecord,'transacciones');

                setTipoCuota(resultadoRecord.idUnidad);
                setTipoCuenta(resultadoRecord.idCuenta);
                setTipoPeriodicidad(resultadoRecord.formaPago);
                setEsRecurrente(resultadoRecord.esRecurrente);
                setStartDate(new Date(resultadoRecord.fechaCobro));

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

    useEffect(() => {
        async function getUnidades() {

            try {
                const resultadoUnidades = await fetchRecordsByParam('getUnidadesByCondominio',idCondominio);

                let opcionesUnidades = [];
                opcionesUnidades.push({value:'todas',label:'Todas las unidades',name:'idUnidad'});

                if(resultadoUnidades) {
                    resultadoUnidades.map((val) => {
                        opcionesUnidades.push({value:val.idUnidad,label:val.nombre,name:'idUnidad'});
                    });


                    setUnidades(opcionesUnidades);
                }
            }catch (e) {
                console.log(e);
            }
        }

        async function getCuentas() {
            try {
                const resultadoCuentas = await fetchRecords(`cuentas/getRecords/${idCondominio}`);

                let opcionesCuentas = [];

                if(resultadoCuentas) {
                    resultadoCuentas.map((val) => {
                        opcionesCuentas.push({value:val.idCuenta,label:`${val.nombre} ($${new Intl.NumberFormat().format(val.total)})`,name:'idCuenta'});
                        cuentasTotal.push({idCuenta:val.idCuenta,total:val.total});
                    });

                    setCuentas(opcionesCuentas);
                }
            }catch (e) {
                console.log(e);
            }
        }


        const validaRecord = () => {
            if(!props.idRecord) {
                setRecord(null);
            }
        };

        getUnidades();
        getCuentas();
        validaRecord();

        return () => {
            console.log("cleaned up");
        };

    },[]);


    const handleChangeCuenta = (idCuenta) => {
        setTipoCuenta(idCuenta);
    };

    useEffect(() => {
        handleChangeRecurrente()
    },[total,tipoCuenta,esRecurrente]);

    const handleChangeRecurrente = () => {



    };


    const onSubmit = async (data) => {
        console.log(data);

        data.idCondominio = idCondominio;

        console.log('tipoCuota ',tipoCuota);
        console.log('tipoPeriodicidad ',tipoPeriodicidad);
        console.log('tipoCuenta ',tipoCuenta);

        data.fechaIni = format(startDate,'yyyy-MM-dd');
        data.fechaFin = format(endDate,'yyyy-MM-dd');
        data.idCuenta = tipoCuenta;
        data.tipoCuota = tipoCuota;

        console.log(data);
        if(record) {

            try {
                const response = await updateRecord(data,'transacciones',record.idTransaccion);
                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha actualizado la transacción",
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
                    title: "Ocurrió un error al actualizar la transacción",
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


                const response = await storeRecord(data,'addTransaccion');
                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha creado una nueva transacción",
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
                    title: "Ocurrió un error al agregar la transacción",
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

    const periodicidad = [
        {value:1,label:'Semana',name:'tipoPeriodicidad'},
        {value:2,label:'Quincena',name:'tipoPeriodicidad'},
        {value:3,label:'Mes',name:'tipoPeriodicidad'},
        {value:4,label:'Año',name:'tipoPeriodicidad'},
    ];

    const cuotas = [
        {value:1,label:'Individual',name:'tipoCuota'},
        {value:2,label:'Mantenimiento',name:'tipoCuota'},
        {value:3,label:'Servicio',name:'tipoCuota'},
        {value:4,label:'Recargo',name:'tipoCuota'},
        {value:5,label:'Extraordinaria',name:'tipoCuota'},
    ];

    const seccionRecurrente = (<div className="animate fadeInLoad one">
        <Row>
            <Col sm={4}>
                <FormGroup>
                    <Label>* Se repite cada</Label>
                    <Select styles={customStyles}
                            options={periodicidad}
                            placeholder="Selecciona una opción..."
                            value={periodicidad.find(op => {
                                return op.value === tipoPeriodicidad
                            })}
                            onChange={(event) => {setTipoPeriodicidad(event.value)}}
                    />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col sm={4}>
                <FormGroup>
                    <Label>* Fecha de Inicio</Label>
                    <DatePicker
                        locale="es"
                        className="form-control"
                        minDate={new Date()}
                        name="fechaIni"
                        dateFormat="dd/MMMM/yyyy"
                        selected={startDate}
                        onChange={date => setStartDate(date)} />
                </FormGroup>
            </Col>
            <Col sm={4}>
                <FormGroup>
                    <Label>* Fecha de Fin</Label>
                    <DatePicker
                        locale="es"
                        className="form-control"
                        name="fechaFin"
                        minDate={new Date()}
                        dateFormat="dd/MMMM/yyyy"
                        selected={endDate}
                        onChange={date => setEndDate(date)} />
                </FormGroup>
            </Col>
            <Col sm={4}>
                <FormGroup>
                    <Label>Indefinida</Label>
                    <input type="checkbox"
                           name="esIndefinida"
                           ref={register}/>
                </FormGroup>
            </Col>
        </Row>
    </div>);

    return(<Modal size="lg" isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Cuota</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>* Nombre</Label>
                            <input className="form-control" type="text" name="nombre" id="" placeholder=""
                                   defaultValue={record ? record.concepto : undefined}
                                   ref={register({required:true})}/>
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <Label>* Monto</Label>
                            <input className="form-control" type="number" name="monto" id="" placeholder=""
                                   defaultValue={record ? record.monto : undefined}
                                   onChange={handleChangeRecurrente}
                                   ref={register({required:true})}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>Descripción</Label>
                            <textarea className="form-control" name="descripcion" id="" placeholder=""
                                      defaultValue={record ? record.descripcion : undefined}
                                      ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <FormGroup>
                            <Label>* Tipo</Label>
                            <Select styles={customStyles}
                                    options={cuotas}
                                    placeholder="Selecciona una opción..."
                                    ref={register}
                                    value={cuotas.find(op => {
                                        return op.value === tipoCuota
                                    })}
                                    onChange={(event) => {setTipoCuota(event.value)}}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <Label>* Aplica para</Label>
                            <Select styles={customStyles}
                                    options={unidades}
                                    placeholder="Selecciona una opción..."
                                    ref={register}
                                    value={unidades.find(op => {
                                        return op.value === tipoUnidad
                                    })}
                                    onChange={(event) => {setTipoUnidad(event.value)}}
                            />
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>* ¿Es recurrente?</label>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio"
                                       value="1"
                                       className="custom-control-input"
                                       id="radioSi"
                                       defaultChecked={esRecurrente === 1}
                                       name="esRecurrente"
                                       ref={register}
                                       onChange={() => setEsRecurrente(1)}
                                />
                                <label className="custom-control-label" htmlFor="radioSi">Si</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio"
                                       value="0"
                                       className="custom-control-input"
                                       id="radioNo"
                                       name="esRecurrente"
                                       ref={register}
                                       defaultChecked={esRecurrente === 0}
                                       onChange={() => setEsRecurrente(0)}
                                />
                                <label className="custom-control-label" htmlFor="radioNo">No</label>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                {esRecurrente ? seccionRecurrente : ''}
            </Form>
        </ModalBody>
        <p className="center">Los campos marcados con * son obligatorios</p>
        <ModalFooter className="d-flex justify-content-around">
            <Button className="neutralButton" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button className="confirmButton" type="submit" disabled={disabledButton} form="form" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Cuota</Button>
        </ModalFooter>
    </Modal>);
};

export default ModalCuota;


