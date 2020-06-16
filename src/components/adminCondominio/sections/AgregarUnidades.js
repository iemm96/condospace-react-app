import React from 'react';
import {UncontrolledTooltip, Button,  FormGroup, Label, Col, Row } from 'reactstrap';
import {storeRecord} from "../../../actions/storeRecord";
import {useUsuario} from "../../../context/usuario-context";
import { useForm } from "react-hook-form";
import Skeleton from 'react-loading-skeleton';
import {store} from "react-notifications-component";

export const AgregarUnidades = (props) => {
    const {cargandoUsuario,idCondominio} = useUsuario();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async data => {
        data.idCondominio = idCondominio;
        console.log(data);

        try {
            await storeRecord(data,'addUnidades');

            window.location.href = `/${props.match.params.condominio}/unidades`;

        }catch (e) {
            console.log(e);
            store.addNotification({
                title: "Ocurrió un error al agregar el condominio",
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

    if(cargandoUsuario) {
        return(
            <Row className="">
                <Col>
                    <Row className="justify-content-center">
                        <Col sm={8}>
                            <h1 style={{fontSize: 60}}>{<Skeleton />}</h1>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col sm={8}>
                            <div>
                                <Row>
                                    <Col sm={6}>
                                        <div style={{fontSize: 50}} >
                                            {<Skeleton/>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={3}>
                                        <div style={{fontSize: 50}} >
                                            {<Skeleton/>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <div style={{fontSize: 50}} >
                                            {<Skeleton/>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <div style={{fontSize: 50}} >
                                            {<Skeleton/>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={10}>
                                        <div style={{fontSize: 50}} >
                                            {<Skeleton/>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="">
                                    <Col className="d-flex justify-content-around">
                                        <div style={{fontSize: 50}} >
                                            {<Skeleton/>}
                                        </div>

                                    </Col>
                                </Row>

                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }else{
        return(
            <Row className="">
                <Col>
                    <Row className="text-center">
                        <Col>
                            <h4>Nombre del condominio</h4>
                            <p>Agrega las unidades de tu condominio</p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col sm={8}>
                            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <Label>*¿Cuántas unidades deseas agregar?</Label>
                                            <input type="number"
                                                   name="unidades"
                                                   min="1"
                                                   max="1000"
                                                   className="form-control"
                                                   ref={register({ required: true })}
                                            />
                                            {errors.unidades && <small>Ingresa un número de 1 a 1000</small>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <FormGroup>
                                            <Label for="">¿Pertenecen a una misma calle?</Label>
                                            <div className="custom-control custom-radio">
                                                <input className="custom-control-input" type="radio" id="radioButtonSi" value="1" name="pertenecen" label="Si" ref={register({ required: true })}/>
                                                <label className="custom-control-label" htmlFor="radioButtonSi">Si</label>
                                                <input className="custom-control-input" type="radio" id="radioButtonNo" value="0" name="pertenecen" label="No" ref={register({ required: true })}/>
                                                <label className="custom-control-label" htmlFor="radioButtonNo">No</label>
                                            </div>
                                            {errors.pertenecen && <small>Selecciona una respuesta</small>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <FormGroup>
                                            <Label>*Nombre de la calle</Label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="calle"
                                                   ref={register({ required: true })}
                                                   />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label for="exampleCustomSelect">*Tipo de Unidades</Label>
                                            <select
                                                className="form-control"
                                                type="select"
                                                id="exampleCustomSelect"
                                                ref={register({ required: true })}
                                                name="tipoUnidades">
                                                <option value="">Selecciona el tipo de unidades...</option>
                                                <option value="Casa">Casas</option>
                                                <option value="Departamento">Departamentos</option>
                                            </select>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={10}>
                                        <FormGroup>
                                            <Label for="">¿Deseas que las unidades se guarden como Departamento 1, Departamento 2…?</Label>
                                            <div  id="UncontrolledTooltipExample">
                                                <input type="radio" id="radioNombreSi" value="1" name="guardarComo" label="Si" ref={register({ required: true })}/>
                                                <label htmlFor="radioNombreSi">Si</label>
                                                <input type="radio" id="radioNombreNo" value="0" name="guardarComo" label="No" ref={register({ required: true })}/>
                                                <label htmlFor="radioNombreNo">No</label>
                                            </div>
                                            <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
                                                Las unidades se guardarán como Unidad 1, Unidad 2…
                                            </UncontrolledTooltip>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="">
                                    <Col className="d-flex justify-content-around">
                                        <Button className="neutralButton" onClick={() => this.props.toggleModal()}>Omitir</Button>
                                        <Button className="confirmButton"  type="submit">Guardar y continuar</Button>
                                    </Col>
                                </Row>

                            </form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

}


