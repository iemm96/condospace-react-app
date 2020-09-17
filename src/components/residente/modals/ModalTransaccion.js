import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import {format} from "date-fns";
import {fetchRecords} from "../../../actions/fetchRecords";
import {useUsuario} from "../../../context/usuario-context";
import {store} from "react-notifications-component";
import {fetchRecord} from "../../../actions/fetchRecord";
registerLocale("es", es);

const ModalTransaccion = (props) => {
    const { register, handleSubmit } = useForm();
    const { idCondominio } = useUsuario();
    const [startDate, setStartDate] = useState(new Date());
    const [tipoTransaccion,setTipoTransaccion] = useState(1);
    const [tipoUnidad,setTipoUnidad] = useState(null);
    const [tipoCuenta,setTipoCuenta] = useState(null);
    const [tipoFormaPago,setTipoFormaPago] = useState([]);
    const [record,setRecord] = useState(null);
    const [unidades,setUnidades] = useState([]);
    const [cuentas,setCuentas] = useState([]);
    const [cuentasTotal,setCuentasTotal] = useState([]);
    const [total,setTotal] = useState(null);
    const [disabledButton,setDisabledButton] = useState(true);

    useEffect(() => {

        //Obtiene los datos del registro
        async function getRecord() {
            try {
                const resultadoRecord = await fetchRecord(props.idRecord,'transacciones');

                setTipoUnidad(resultadoRecord.idUnidad);
                setTipoCuenta(resultadoRecord.idCuenta);
                setTipoFormaPago(resultadoRecord.formaPago);
                setTipoTransaccion(resultadoRecord.esIngreso);
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
        handleChangeTotal()
    },[total,tipoCuenta,tipoTransaccion]);

    const handleChangeTotal = () => {

        if(!tipoCuenta) {
            return;
        }

        const idCuenta = tipoCuenta;

        //Se busca el total de la cuenta en el arreglo cuentasTotal, si se encuentra se regresa
        const cuenta = cuentasTotal.find(function(value, index) {
            if(value.idCuenta === idCuenta) {
                return value.total;
            }
        });

        let inputMonto = document.getElementById('inputMonto');
        let radioIngreso = document.getElementById('radioIngreso');
        let radioEgreso = document.getElementById('radioEgreso');

        if(inputMonto.value > 0){

            if(radioIngreso.checked) {

                setTipoTransaccion(1);
                setTotal(parseInt(cuenta.total) + parseInt(inputMonto.value));
            }else if(radioEgreso.checked) {
                setTipoTransaccion(0);

                const result = parseInt(cuenta.total) - parseInt(inputMonto.value);

                if(result > 0) {
                    setTotal(result);
                }else {
                    setDisabledButton(true);
                    return;
                }
            }

            setDisabledButton(false);
        }
    };

    const onSubmit = async (data) => {
        console.log(data);

        console.log(startDate);

        let date = format(startDate,'yyyy-MM-dd');
        console.log(date);
        console.log('tipoUnidad ',tipoUnidad);
        console.log('tipoFormaPago ',tipoFormaPago);
        console.log('tipoCuenta ',tipoCuenta);

        data.fechaCobro = format(startDate,'yyyy-MM-dd');
        data.fechaHora_transaccion = format(new Date(),'yyyy-MM-dd HH:mm:ss');
        data.idCuenta = tipoCuenta;
        data.formaPago = tipoFormaPago;
        data.idUnidad = tipoUnidad;

        console.log(data);
        if(record) {

            try {
                const response = await updateRecord(data,'transacciones',record.idTransaccion,idCondominio);
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


                const response = await storeRecord(data,'addTransaccion',idCondominio);
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

    const formasPago = [
        {value:1,label:'Efectivo',name:'formaPago'},
        {value:2,label:'Cheque',name:'formaPago'},
    ];

    return(<Modal size="lg" isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Transacción</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>* Concepto</Label>
                            <input className="form-control" type="text" name="concepto" id="" placeholder=""
                                   defaultValue={record ? record.concepto : undefined}
                                   ref={register({required:true})}/>
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <Label>* Monto</Label>
                            <input className="form-control" type="number" name="monto" id="inputMonto" placeholder=""
                                   defaultValue={record ? record.monto : undefined}
                                   onChange={handleChangeTotal}
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
                            <label>* ¿Es ingreso o egreso?</label>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio"
                                       value="1"
                                       className="custom-control-input"
                                       id="radioIngreso"
                                       defaultChecked={tipoTransaccion === 1}
                                       name="esIngreso"
                                       ref={register}
                                       onChange={handleChangeTotal}
                                       />
                                    <label className="custom-control-label" htmlFor="radioIngreso">Ingreso</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio"
                                       value="0"
                                       className="custom-control-input"
                                       id="radioEgreso"
                                       name="esIngreso"
                                       ref={register}
                                       defaultChecked={tipoTransaccion === 0}
                                       onChange={handleChangeTotal}
                                       />
                                    <label className="custom-control-label" htmlFor="radioEgreso">Egreso</label>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <FormGroup>
                            <Label>* Unidad</Label>
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
                    <Col sm={4}>
                        <FormGroup>
                            <Label>* Forma de pago</Label>
                            <Select styles={customStyles}
                                    options={formasPago}
                                    placeholder="Selecciona una opción..."
                                    value={formasPago.find(op => {
                                        return op.value === tipoFormaPago
                                    })}
                                    onChange={(event) => {setTipoFormaPago(event.value)}}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <Label>Referencia</Label>
                            <input className="form-control" type="text" name="referencia" id="" placeholder=""
                                   defaultValue={record ? record.referencia : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col sm={4}>
                        <FormGroup>
                            <Label>* Cuenta</Label>
                            <Select styles={customStyles}
                                    options={cuentas}
                                    value={cuentas.find(op => {
                                        return op.value === tipoCuenta
                                    })}
                                    placeholder="Selecciona una opción..."
                                    onChange={(event) => {handleChangeCuenta(event.value)}}
                                    />
                        </FormGroup>
                        <Row>
                            <Col>
                                {total ? 'El total de la cuenta será de $' + new Intl.NumberFormat().format(total) : ''}
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <Label>* Se cobró el día</Label>
                            <DatePicker
                                locale="es"
                                className="form-control"
                                maxDate={new Date()}
                                name="fechaCobro"
                                dateFormat="dd/MMMM/yyyy"
                                selected={startDate}
                                onChange={date => setStartDate(date)} />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </ModalBody>
        <p className="center">Los campos marcados con * son obligatorios</p>
        <ModalFooter className="d-flex justify-content-around">
            <Button className="neutralButton" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button className="confirmButton" type="submit" disabled={disabledButton} form="form" >{props.idRecord ? 'Actualizar ' : 'Crear '} Transacción</Button>
        </ModalFooter>
    </Modal>);
};

export default ModalTransaccion;


