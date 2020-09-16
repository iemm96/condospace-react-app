import React, {useEffect, useState} from "react";
import {Button, Col, Form, FormGroup, Label, ModalFooter, Row} from "reactstrap";
import {useForm} from "react-hook-form";
import {storeRecord} from "../../../../actions/storeRecord";
import {store} from "react-notifications-component";
import {useHistory, withRouter} from "react-router-dom";
import {fetchRecord} from "../../../../actions/fetchRecord";
import {updateRecord} from "../../../../actions/updateRecord";

const FormularioUsuariosCondominio = (props) => {
    const { register, handleSubmit } = useForm();
    const [ condominio, setCondomonio ] = useState(null);
    const [ record, setRecord ] = useState(null);
    const idCondominio  = props.match.params.idCondominio;
    const idRecord  = props.match.params.idRecord;
    const history = useHistory();

    useEffect(() => {

        async function getRecord() {
            try {
                const result = await fetchRecord(idRecord,'usuarios');
                if(result) {
                    setRecord(result);
                }
            }catch (e) {
                console.log(e)
            }
        };

        async function getCondominio() {
            try {
                const result = await fetchRecord(idCondominio,'condominios');
                if(result) {
                    setCondomonio(result);
                }
            }catch (e) {
                console.log(e)
            }
        };

        if(idCondominio) {
            getCondominio();
        }

        if(idRecord) {
            getRecord();
        }
    },[]);

    const onSubmit = async data => {
        data.idTipoUsuario = 2;
        data.idCondominio = idCondominio;
        data.password = 'admin_condominio';

        if(record) {

            try {
                const response = await updateRecord(data,'usuarios',idRecord);

                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha actualizado el usuario",
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
                }

            }catch (e) {
                store.addNotification({
                    title: "Ocurrió un error al agregar el usuario",
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
                const response = await storeRecord(data,'register');

                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha creado el usuario",
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
                }

            }catch (e) {
                console.log(e);
                store.addNotification({
                    title: "Ocurrió un error al actualizar el usuario",
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

        history.push(`/admin/usuariosCondominio/${idCondominio}`);
    };

    return(
        <div className="animate fadeIn one">
            <Row>
                <Col className="text-center">
                    <h3>{record ? 'Editar' : 'Nuevo'} Usuario Administrador para {condominio && condominio.nombreCondominio}</h3>
                </Col>
            </Row>
            <Row className="animate fadeIn two d-flex justify-content-center mt-3">
                <Col sm={8} className="">
                    <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col sm={8}>
                                <FormGroup>
                                    <Label>*Nombre completo</Label>
                                    <input class="form-control" type="text" name="name" id="" placeholder=""
                                           defaultValue={record ? record.name : undefined}
                                           ref={register}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>*Email</Label>
                                    <input class="form-control" type="text" name="email" id=""
                                           defaultValue={record ? record.email : undefined}
                                           ref={register}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>Teléfono</Label>
                                    <input class="form-control" type="text" name="telefono" id=""
                                           defaultValue={record ? record.telefono : undefined}
                                           ref={register}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <p className="justify-content-start">
                            {record ? 'Nota: La contraseña será reestablecida a ' :
                                'La contraseña por defecto es '
                            } <b>admin_condominio</b>
                        </p>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="text-center">
                    <p>Los campos marcados con * son obligatorios</p>
                </Col>
            </Row>
            <Row className="mt-2 d-flex justify-content-center">
                <Col sm={8} className="d-flex justify-content-around">
                    <Button className="neutralButton" onClick={() => {
                        history.push(`/admin/usuariosCondominio/${idCondominio}`);
                    }}>Cancelar</Button>
                    <Button className="confirmButton" form="form" type="submit">{record ? 'Editar ' : 'Crear '} Usuario</Button>
                </Col>
            </Row>

        </div>
    );
};

export default withRouter(FormularioUsuariosCondominio);