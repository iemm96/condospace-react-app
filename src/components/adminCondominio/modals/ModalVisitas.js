import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Col, Row } from 'reactstrap';
import Select from "react-select";

import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";
import { registerLocale } from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import {fetchRecords} from "../../../actions/fetchRecords";
import {useUsuario} from "../../../context/usuario-context";
import {store} from "react-notifications-component";
import CreatableSelect from 'react-select/creatable';
import moment from "moment";

registerLocale("es", es);

const ModalVisitas = (props) => {

    const { register, handleSubmit } = useForm();
    const { idCondominio } = useUsuario();
    const [conVehiculo,setConVehiculo] = useState(0);
    const [idResidente,setIdResidente] = useState(null);
    const [record] = useState(null);
    const [residentes,setResidentes] = useState([]);
    const [datosResidentes,setDatosResidentes] = useState([]);
    const [disabledButton,setDisabledButton] = useState(true);

    const [nuevoVehiculo,setNuevoVehiculo] = useState(null);
    const [idVehiculo,setIdVehiculo] = useState(null);
    const [vehiculos,setVehiculos] = useState([]);
    const [datosVehiculos,setDatosVehiculos] = useState([]);
    const [marca,setMarca] = useState(null);
    const [modelo,setModelo] = useState(null);
    const [color,setColor] = useState(null);
    const [tipoIdentifacion,setTipoIdentificacion] = useState(null);
    const [idUnidad,setIdUnidad] = useState(null);
    const [residenteSeleccionado,setResidenteSeleccionado] = useState(null);

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

    useEffect(() => {
        async function getResidentes() {
            const resultadoResidentes = await fetchRecords(`residentes/${idCondominio}`);
            
            if(resultadoResidentes) {
                let opcionesResidentes = [];

                resultadoResidentes.map((val) => {
                    opcionesResidentes.push({value:val.id,label:val.name,name:'idResidente'});
                });

                setResidentes(opcionesResidentes);
                setDatosResidentes(resultadoResidentes);
            }
        }

        getResidentes();
    },[])

    const onSubmit = async (data) => {

        const vehiculo = {
            idCondominio:idCondominio,
            marca:data.marca,
            modelo:data.modelo,
            color:data.color
        };

        const visitante = {
            nombre:data.nombre,
            apellidos:data.apellidos,
            noIdentificacion:data.noIdentificacion,
            tipoIdentificacion:data.tipoIdentificacion,
        };

        try {

            let responseVehiculos = [];

            if(conVehiculo) {

                if(nuevoVehiculo) {
                    responseVehiculos = await storeRecord(vehiculo, 'vehiculos');

                }else{
                    responseVehiculos = await updateRecord(vehiculo, 'vehiculos',idVehiculo);

                }
            }

            const responseVisitante = await storeRecord(visitante, 'visitantes');

            if(responseVehiculos && responseVisitante) {

                let visita = {
                    idCondominio:idCondominio,
                    idUnidad:idUnidad,
                    idVisitante:responseVisitante?.idVisitante,
                    fechaHora_llegada: moment().format('YYYY-MM-DD HH:mm:s'),
                    noVisitantes:data.noVisitantes,
                };

                if(responseVehiculos) {
                    visita.idVehiculo = responseVehiculos?.idVehiculo;
                }

                const responseVisitas = await storeRecord(visita, 'visitas');

                if(responseVisitas) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha agregado la visita",
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

        } catch (e) {
            store.addNotification({
                title: "Ocurrió un error al agregar la visita",
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

    const handleChangeVehiculo = (value) => {
        setConVehiculo(value);

        if(value === 1) {
            getVehiculos();
        }
    };

    const getVehiculos = async () => {
        try {
            const resultadoVehiculos = await fetchRecords(`vehiculos/getRecords/${idCondominio}`);

            if(resultadoVehiculos) {
                let opcionesVehiculo = [];

                resultadoVehiculos.map((val) => {
                    opcionesVehiculo.push({value:val.idVehiculo,label:val.placas,name:'idVehiculo'});
                });

                setVehiculos(opcionesVehiculo);
                setDatosVehiculos(resultadoVehiculos);
            }
        }catch (e) {
            console.log(e);
        }
    };

    const handlePlacasSelectChange = (inputValue, actionMeta) => {

        if(inputValue) {
            if(inputValue.__isNew__) {
                setNuevoVehiculo(inputValue.value);
            }else{
                setIdVehiculo(inputValue.value);
            }

            console.log(datosVehiculos);
            //Se buscan los datos del vehiculo en el arreglo datosVehiculo, si se encuentra se precargan en su input
            datosVehiculos.find(function(value, index) {

                if(value.idVehiculo === inputValue.value) {
                    setMarca(value.marca);
                    setModelo(value.modelo);
                    setColor(value.color);
                }
            });
            
            console.group('Input Changed');
            console.log(inputValue);
            console.log(`action: ${actionMeta.action}`);
            console.groupEnd();
        }
    };

    const handleChangeSelectResidente =  (residente) => {

        setDisabledButton(false);
        //Se buscan los datos del vehiculo en el arreglo datosVehiculo, si se encuentra se precargan en su input
        const residenteSeleccionado = datosResidentes.find(function(value, index) {

            if(value.id === residente) {
                return value;
            }
        });

        setIdUnidad(residenteSeleccionado.idUnidad);

        setResidenteSeleccionado(residenteSeleccionado);
    };

    const seccionVehiculo = (
        <div className="animate fadeIn one">
            <p className="divider">
                Datos del Vehículo
                <hr/>
            </p>
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label>* Placas</Label>
                        <CreatableSelect
                                styles={customStyles}
                                isClearable
                                options={vehiculos}
                                placeholder="Selecciona..."
                                value={vehiculos.find(op => {
                                    return op.value === idVehiculo
                                })}
                                onChange={handlePlacasSelectChange}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <FormGroup>
                        <Label>Marca</Label>
                        <input className="form-control" type="text" name="marca" id="" placeholder=""
                               defaultValue={marca ? marca : undefined}
                               ref={register}/>
                    </FormGroup>
                </Col>
                <Col sm={4}>
                    <FormGroup>
                        <Label>Modelo</Label>
                        <input className="form-control" type="text" name="modelo" id="" placeholder=""
                               defaultValue={modelo ? modelo : undefined}
                               ref={register}/>
                    </FormGroup>
                </Col>
                <Col sm={4}>
                    <FormGroup>
                        <Label>Color</Label>
                        <input className="form-control" type="text" name="color" id="" placeholder=""
                               defaultValue={color ? color : undefined}
                               ref={register}/>
                    </FormGroup>
                </Col>
            </Row>
        </div>
    );

    const seccionDatosUnidad = (
        <Row className="animate one fadeIn">
            <Col>
                {residenteSeleccionado?.telefono ? <p><b>Teléfono del residente:</b> {residenteSeleccionado.telefono}</p> : '' }
                <p className="divider">
                    Domicilio
                    <hr/>
                </p>
                {residenteSeleccionado?.nombre ? <p><b>Unidad:</b> {residenteSeleccionado.nombre}</p> : '' }
                {residenteSeleccionado?.calle ? <p><b>Calle:</b> {residenteSeleccionado.calle}</p> : '' }
                {residenteSeleccionado?.noExterior ? <p><b>No. Exterior:</b> {residenteSeleccionado.noExterior}</p> : '' }
            </Col>
        </Row>
    );


    const opcionesIdentificacion = ([
        {value:1,label:'INE',name:'tipoIdentificacion'},
        {value:2,label:'Pasaporte',name:'tipoIdentificacion'},
        {value:3,label:'Licencia de manejo',name:'tipoIdentificacion'},
    ]);

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Registrar'} Visita</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <p className="divider">
                    Datos del Visitante
                    <hr/>
                </p>
                <Row>
                    <Col sm={4}>
                        <FormGroup>
                            <Label>* Nombre</Label>
                            <input className="form-control" type="text" name="nombre" id="" placeholder=""
                                   defaultValue={record ? record.nombre : undefined}
                                   ref={register({required:true})}/>
                        </FormGroup>
                    </Col>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>* Apellidos</Label>
                            <input className="form-control" name="apellidos" id="" placeholder=""
                                   defaultValue={record ? record.apellidos : undefined}
                                   ref={register({required:true})}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>Motivo de la visita</Label>
                            <textarea className="form-control" name="detalle" id="" placeholder=""
                                      defaultValue={record ? record.detalle : undefined}
                                      ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>* Identificación</Label>
                            <Select styles={customStyles}
                                    options={opcionesIdentificacion}
                                    placeholder="Selecciona..."
                                    ref={register}
                                    value={opcionesIdentificacion.find(op => {
                                        return op.value === tipoIdentifacion
                                    })}
                                    onChange={(event) => {setTipoIdentificacion(event.value)}}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>No. de identificación</Label>
                            <input className="form-control" type="text" name="noIdentificacion" id="" placeholder=""
                                   defaultValue={record ? record.noIdentificacion : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>* ¿A quién visita?</Label>
                            <Select styles={customStyles}
                                    options={residentes}
                                    placeholder="Selecciona una opción..."
                                    ref={register}
                                    value={residentes.find(op => {
                                        return op.value === idResidente
                                    })}
                                    onChange={(event) => {handleChangeSelectResidente(event.value)}}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <Label>No. de Visitantes</Label>
                            <input className="form-control" type="text" name="noVisitantes" id="" placeholder=""
                                   defaultValue={record ? record.noVisitantes : undefined}
                                   ref={register}/>
                        </FormGroup>
                    </Col>
                </Row>
                {residenteSeleccionado ? seccionDatosUnidad : ''}
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>* ¿Vehículo?</label><br/>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio"
                                       value="1"
                                       className="custom-control-input"
                                       id="radioSi"
                                       defaultChecked={conVehiculo === 1}
                                       name="conVehiculo"
                                       ref={register}
                                       onChange={() => handleChangeVehiculo(1)}
                                />
                                <label className="custom-control-label" htmlFor="radioSi">Si</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio"
                                       value="0"
                                       className="custom-control-input"
                                       id="radioNo"
                                       name="conVehiculo"
                                       ref={register}
                                       defaultChecked={conVehiculo === 0}
                                       onChange={() => handleChangeVehiculo(0)}
                                />
                                <label className="custom-control-label" htmlFor="radioNo">No</label>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                {conVehiculo ? seccionVehiculo : ''}
            </Form>
        </ModalBody>
        <p className="center">Los campos marcados con * son obligatorios</p>
        <ModalFooter className="d-flex justify-content-around">
            <Button className="neutralButton" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button className="confirmButton" type="submit" disabled={disabledButton} form="form" color="primary">{props.idRecord ? 'Actualizar ' : 'Registrar '} Visita</Button>
        </ModalFooter>
    </Modal>);


}

export default ModalVisitas;
