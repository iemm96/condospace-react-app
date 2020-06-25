import React, { useEffect, useState } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Row, Col} from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import {useForm} from "react-hook-form";
import {useUsuario} from "../../../context/usuario-context";
import {store} from "react-notifications-component";
import DatePicker from "react-datepicker/es";
import {format} from "date-fns";

const ModalEvento = (props) => {
    //variables de estado
    const [areas,setAreas] = useState([]);
    const [idArea,setIdArea] = useState([]);
    const [record,setRecord] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    const {register, handleSubmit } = useForm();
    const { usuario,idCondominio } = useUsuario();

    useEffect(() => {

        //Obtiene los datos del registro
        async function getRecord() {
            try {
                const resultadoRecord = await fetchRecord(props.idRecord,'eventos');

                setIdArea(resultadoRecord.idArea);

                if(resultadoRecord.fecha) {
                    setStartDate(new Date(resultadoRecord.fecha));
                }
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
        async function getAreas() {
            const resultadoAreas = await fetchRecords('areas',idCondominio);

            if(resultadoAreas) {
                let opcionesAreas = [];

                resultadoAreas.map((val) => {
                    opcionesAreas.push({value:val.idArea,label:val.nombre,name:'idArea'});
                });

                setAreas(opcionesAreas);
            }
        }

        getAreas();
    },[])

    const onSubmit = async (data) => {

        data.idCondominio = idCondominio;
        data.fecha = format(startDate,'yyyy-MM-dd');
        data.usuario= usuario.id;
        data.idArea= idArea;
        if(record){

            try {

                const response = await updateRecord(data,'eventos',record.idEvento,idCondominio);

                console.log(response);
                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha actualizado el Evento",
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
                    title: "Ocurrió un error al actualizar el evento",
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
                const response = await storeRecord(data,'eventos',idCondominio);
                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha creado una nuevo evento",
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
                    title: "Ocurrió un error al agregar el evento",
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

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{props.idRecord ? 'Actualizar' : 'Crear'} Evento</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>* Título</Label>
                            <input className="form-control" type="text" name="nombre" id="" placeholder=""
                                   defaultValue={record ? record.nombre : undefined}
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
                            <Label>* Fecha de Evento</Label>
                            <DatePicker
                                locale="es"
                                className="form-control"
                                minDate={new Date()}
                                name="fecha"
                                dateFormat="dd/MMMM/yyyy"
                                selected={startDate}
                                onChange={date => setStartDate(date)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <Label>* Lugar</Label>
                            <Select styles={customStyles}
                                    options={areas}
                                    placeholder="Selecciona ..."
                                    value={areas.find(op => {
                                        return op.value === idArea
                                    })}
                                    onChange={(event) => {setIdArea(event.value)}}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </ModalBody>
        <p className="center">Los campos marcados con * son obligatorios</p>
        <ModalFooter className="d-flex justify-content-around">
            <Button className="neutralButton" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button className="confirmButton" type="submit" form="form" >{props.idRecord ? 'Actualizar ' : 'Crear '} Evento</Button>
        </ModalFooter>
    </Modal>);


}

export default ModalEvento;