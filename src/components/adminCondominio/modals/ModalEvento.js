import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label } from 'reactstrap';
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
    const [setRecordState] = useState(props);

    const {register, handleSubmit } = useForm();
    const { usuario,idCondominio } = useUsuario();

    useEffect(() => {
        setRecordState(props);

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
            const resultadoAreas = await fetchRecords(`areas/getRecords/${idCondominio}`);

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

                const response = await updateRecord(data,'eventos',record.idEvento);

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
                const response = await storeRecord(data,'eventos');
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
                   // props.updateRecords();
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
                <FormGroup>
                    <Label>* Titulo </Label>
                    <input className="form-control" type="text" name="nombre" id="" placeholder="Nombre"
                           defaultValue={record ? record.nombre : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Label>* Descripcion </Label>
                    <input className="form-control" type="textarea" name="descripcion" id="" placeholder="Descripción"
                           value={props.idRecord ? props.descripcion : undefined}
                           ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Label>* Fecha de Evento</Label>
                    <DatePicker
                        locale="es"
                        className="form-control"
                        maxDate={new Date()}
                        name="fecha"
                        dateFormat="dd/MMMM/yyyy"
                        selected={startDate}
                        onChange={date => setStartDate(date)} />
                </FormGroup>
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

            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button form="form" type="submit" color="primary">{props.idRecord ? 'Actualizar ' : 'Crear '} Evento</Button>
        </ModalFooter>
    </Modal>);
}

export default ModalEvento;