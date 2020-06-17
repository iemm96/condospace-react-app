import React, {useState} from 'react';
import {UncontrolledTooltip, Button,  FormGroup, Label, Col, Row } from 'reactstrap';
import {storeRecord} from "../../../actions/storeRecord";
import {useUsuario} from "../../../context/usuario-context";
import { useForm } from "react-hook-form";
import Skeleton from 'react-loading-skeleton';
import {store} from "react-notifications-component";
import {useHistory} from 'react-router';
import Select from "react-select";

export const AgregarUnidades = (props) => {
    const {cargandoUsuario,idCondominio,usuario} = useUsuario();
    const { register, handleSubmit, errors } = useForm();
    const [pertenecen,setPertenecen] = useState(false);
    const [tipoUnidad,setTipoUnidad] = useState(null);
    let history = useHistory();

    const onSubmit = async data => {
        data.idCondominio = idCondominio;
        data.tipoUnidades = tipoUnidad;
        console.log(data);

        try {
            await storeRecord(data,'addUnidades');
            history.push(`/${props.match.params.condominio}/unidades`);
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
                            <h4>{usuario.condominio}</h4>
                            <p>Agrega las unidades de tu condominio</p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col sm={8}>
                            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col sm={6}>
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
                                            <label>* ¿Pertenecen a una misma calle?</label><br/>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio"
                                                       value="1"
                                                       className="custom-control-input"
                                                       id="radioSi"
                                                       name="pertenecen"
                                                       ref={register({ required: true })}
                                                       onChange={() => setPertenecen(true)}
                                                />
                                                <label className="custom-control-label" htmlFor="radioSi">Si</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio"
                                                       value="0"
                                                       className="custom-control-input"
                                                       id="radioNo"
                                                       name="pertenecen"
                                                       ref={register({ required: true })}
                                                       onChange={() => setPertenecen(false)}
                                                />
                                                <label className="custom-control-label" htmlFor="radioNo">No</label>
                                            </div>
                                            {errors.pertenecen && <small>Selecciona una respuesta</small>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {pertenecen ? (<Row className="animate fadeIn one">
                                    <Col sm={8}>
                                        <FormGroup>
                                            <Label>* Nombre de la calle</Label>
                                            <input className="form-control"
                                                   type="text"
                                                   name="calle"
                                                   ref={register({ required: true })}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>) : ''}
                                <Row>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label for="exampleCustomSelect">*Tipo de Unidades</Label>
                                            <Select styles={customStyles}
                                                    options={[{value:"Casa",label:'Casas',name:'tipoUnidades'},
                                                        {value:"Departamento",label:'Departamentos',name:'tipoUnidades'}]}
                                                    placeholder="Selecciona una opción..."
                                                    onChange={(event) => {setTipoUnidad(event.value)}}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={10}>
                                        <FormGroup >
                                            <Label for="">¿Deseas que las unidades se guarden como Departamento 1, Departamento 2…?</Label>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio"
                                                       value="1"
                                                       className="custom-control-input"
                                                       id="radioSi"
                                                       name="guardarComo"
                                                       ref={register({ required: true })}
                                                       onChange={() => setPertenecen(true)}
                                                />
                                                <label className="custom-control-label" htmlFor="radioSi">Si</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio"
                                                       value="0"
                                                       className="custom-control-input"
                                                       id="radioNo"
                                                       name="guardarComo"
                                                       ref={register({ required: true })}
                                                       onChange={() => setPertenecen(false)}
                                                />
                                                <label className="custom-control-label" htmlFor="radioNo">No</label>
                                            </div>
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


