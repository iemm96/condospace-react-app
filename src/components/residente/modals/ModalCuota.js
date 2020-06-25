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

registerLocale("es", es);


const ModalCuota = (props) => {
    //Importante
    const { register, handleSubmit } = useForm();
    const { idCondominio } = useUsuario();
    const [ recordState, setRecordState] = useState(props);
    const [startDate, setStartDate] = useState(new Date());
    const [esRecurrente,setEsRecurrente] = useState(0);
    const [tipoCuota,setTipoCuota] = useState(null);
    const [tipoUnidad,setTipoUnidad] = useState(null);
    const [tipoCuenta,setTipoCuenta] = useState(null);
    const [tipoPeriodicidad,setTipoPeriodicidad] = useState([]);
    const [record,setRecord] = useState(null);
    const [unidades,setUnidades] = useState([]);
    const [cuentas,setCuentas] = useState([]);
    const [cuentasTotal] = useState([]);
    const [fechaPrimerCobro,setFechaPrimerCobro] = useState(null);
    const [disabledButton,setDisabledButton] = useState(false);

    useEffect(() => {
        setRecordState(props);

        //Obtiene los datos del registro
        async function getRecord() {
            try {
                const resultadoRecord = await fetchRecord(props.idRecord,'cuotas');

                setTipoCuota(resultadoRecord.tipoCuota);
                setTipoCuenta(resultadoRecord.idCuenta);
                setTipoPeriodicidad(resultadoRecord.idPeriodicidad);
                setEsRecurrente(resultadoRecord.esRecurrente);
                if(resultadoRecord.fechaSigCobro) {
                    setStartDate(new Date(resultadoRecord.fechaSigCobro));
                }

                if(resultadoRecord.idUnidad) {
                    setTipoUnidad(resultadoRecord.idUnidad);
                }

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


        async function getCuentas() {
            try {
                const resultadoCuentas = await fetchRecords(`cuentas/getRecords/${idCondominio}`,idCondominio);

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
    },[tipoCuenta,esRecurrente,startDate,fechaPrimerCobro]);

    async function getUnidades() {

        try {
            const resultadoUnidades = await fetchRecordsByParam('getUnidadesByCondominio',idCondominio);

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
    }

    const handleChangeRecurrente = () => {

    };

    const handleChangeTipoCuota = (cuota) => {
        if(cuota === 1) {
            getUnidades();
        }else{
            setUnidades([]);
        }

        setTipoCuota(cuota);
    }

    const handleChangePeriodicidad = (tipoPeriodicidad) => {

        setTipoPeriodicidad(tipoPeriodicidad);

        switch (tipoPeriodicidad) {
            case 1: {
                const result = addWeeks(startDate,1);

                setFechaPrimerCobro(result);

                break;
            }
            case 2: {
                const result = addMonths(startDate,1);
                setFechaPrimerCobro(result);

                break;

            }
            case 3: {
                const result = addYears(startDate,1);
                setFechaPrimerCobro(result);

                break;

            }
        }
    }

    const handleChangeFechaInicio = (date) => {

        setStartDate(date);
        switch (tipoPeriodicidad) {
            case 1: {
                const result = addWeeks(date,1);

                setFechaPrimerCobro(result);
                break;
            }
            case 2: {
                const result = addMonths(date,1);
                setFechaPrimerCobro(result);

                break;

            }
            case 3: {
                const result = addYears(date,1);
                setFechaPrimerCobro(result);

                break;

            }
        }
    }

    const onSubmit = async (data) => {
        console.log(data);

        data.idCondominio = idCondominio;


        data.fechaIni = format(startDate,'yyyy-MM-dd');

        if(fechaPrimerCobro) {
            data.fechaSigCobro = format(fechaPrimerCobro,'yyyy-MM-dd');
        }

        data.idUnidad = tipoUnidad;
        data.tipoCuota = tipoCuota;
        data.esActiva = 1;
        data.esRecurrente = esRecurrente;

        if(tipoPeriodicidad) {
            data.idPeriodicidad = tipoPeriodicidad;
        }

        console.log(data);
        if(record) {

            try {
                const response = await updateRecord(data,'cuotas',record.idCuota);
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

                const response = await storeRecord(data,'cuotas');
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


    const selectUnidades = (
        <Col sm={4} className="animate fadeIn one">
            <FormGroup>
                <Label>* Aplica para</Label>
                <Select styles={customStyles}
                        options={unidades}
                        placeholder="Selecciona..."
                        ref={register}
                        value={unidades.find(op => {
                            return op.value === tipoUnidad
                        })}
                        onChange={(event) => {setTipoUnidad(event.value)}}
                />
            </FormGroup>
        </Col>
    );

    const seccionPrimerCobro = (
        <Row>
            <Col sm={6}>
                <p>El primer cobro se hará el día {fechaPrimerCobro ? format(fechaPrimerCobro,'dd/MM/yyyy') : ''}</p>
            </Col>
        </Row>

    );

    const periodicidad = [
        {value:1,label:'Semana',name:'tipoPeriodicidad'},
        {value:2,label:'Mes',name:'tipoPeriodicidad'},
        {value:3,label:'Año',name:'tipoPeriodicidad'},
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
            <Col sm={6}>
                <FormGroup>
                    <Label>* Se repite cada</Label>
                    <Select styles={customStyles}
                            options={periodicidad}
                            placeholder="Selecciona..."
                            value={periodicidad.find(op => {
                                return op.value === tipoPeriodicidad
                            })}
                            onChange={(event) => handleChangePeriodicidad(event.value)}
                    />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col sm={6}>
                <FormGroup>
                    <Label>* Fecha de Inicio</Label>
                    <DatePicker
                        locale="es"
                        className="form-control"
                        minDate={startDate}
                        name="fechaIni"
                        dateFormat="dd/MMMM/yyyy"
                        selected={startDate}
                        onChange={date => handleChangeFechaInicio(date)}
                       />
                </FormGroup>
            </Col>
        </Row>
        {fechaPrimerCobro ? seccionPrimerCobro : ''}

    </div>);

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Cuota</ModalHeader>
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
                    <Col sm={6}>
                        <FormGroup>
                            <Label>* Tipo</Label>
                            <Select styles={customStyles}
                                    options={cuotas}
                                    placeholder="Selecciona..."
                                    ref={register}
                                    value={cuotas.find(op => {
                                        return op.value === tipoCuota
                                    })}
                                    onChange={(event) => handleChangeTipoCuota(event.value)}
                            />
                        </FormGroup>
                    </Col>
                    {unidades.length > 0 ? selectUnidades : ''}
                </Row>
                <Row>
                    <Col sm={4}>
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
            <Button className="confirmButton" type="submit" disabled={disabledButton} form="form" >{props.idRecord ? 'Actualizar ' : 'Crear '} Cuota</Button>
        </ModalFooter>
    </Modal>);
};

export default ModalCuota;


