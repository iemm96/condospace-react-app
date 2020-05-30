import React, { useState, useEffect } from 'react';
import {CustomInput,UncontrolledTooltip, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Select from "react-select";

import {fetchRecords} from "../../../actions/fetchRecords";
import {fetchRecord} from "../../../actions/fetchRecord";
import {updateRecord} from "../../../actions/updateRecord";
import {storeRecord} from "../../../actions/storeRecord";
import stringifyData from "../../../services/stringifyData";
import {url_base} from "../../../constants/api_url";
import CookieService from "../../../services/CookieService";
const api_url = url_base;


let tiposImportancia = [];
let tiposVisibilidad = [];

export default class AgregarUnidades extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    async componentDidMount() {

    }

    async componentWillReceiveProps(nextProps) {
        this.setState({
            idCondominio:nextProps.idRecord
        });

        if(nextProps.idRecord) {
            try {
                let recordData = await fetchRecord(nextProps.idRecord,this.props.resource);
                this.setState({...recordData});
            }catch (error) {
                console.log(error);
            }
        }
    }

    handleInputChange = event => {

        let target;

        if(target = event.target) {
            const value = target.value;
            const name = target.name;
            this.setState({
                [name]:value
            });
        }else{
            const name = event.name;
            const value = event.value;
            this.setState({
                [name]:value
            })
        }
    };

    agregarUnidades = () => {
        const authToken = CookieService.get('access_token');

        fetch(`${api_url}addUnidades`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
                "Authorization": 'Bearer ' + authToken,
            },
            body:stringifyData(this.state)
        }).then((res) => res.json())
            .then((data) =>  {
               window.location.href = `/${this.props.match.params.condominio}/unidades`;
            })
            .catch((err)=>console.log(err));
    }

    render() {

        console.log('here');

        return(
            <div>
                <Row className="text-center">
                    <Col >
                        <h4>Nombre del condominio</h4>
                        <p>Agrega las unidades de tu condominio</p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col>
                        <Form id="form">
                            <Row>
                                <Col sm={4}>
                                    <FormGroup>
                                        <Label>*¿Cuántas unidades deseas agregar?</Label>
                                        <Input type="number"
                                               name="unidades"
                                               min="1"
                                               max="1000"
                                               onChange={event => this.handleInputChange(event)}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>

                                    <FormGroup>
                                        <Label for="">¿Pertenecen a una misma calle?</Label>
                                        <div>
                                            <CustomInput onChange={event => this.handleInputChange(event)} type="radio" id="exampleCustomRadio3" value="1" name="pertenecen" label="Si" />
                                            <CustomInput onChange={event => this.handleInputChange(event)} type="radio" id="exampleCustomRadio4" value="0" name="pertenecen" label="No" />
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Label>*Nombre de la calle</Label>
                                        <Input type="text"
                                               name="calle"
                                               onChange={event => this.handleInputChange(event)}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <FormGroup>
                                        <Label for="exampleCustomSelect">*Tipo de Unidades</Label>
                                        <CustomInput
                                            type="select"
                                            id="exampleCustomSelect"
                                            onChange={event => this.handleInputChange(event)}
                                            name="tipoUnidades">
                                            <option value="">Selecciona el tipo de unidades...</option>
                                            <option value="Casa">Casas</option>
                                            <option value="Departamento">Departamentos</option>
                                        </CustomInput>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={8}>
                                    <FormGroup>
                                        <Label for="">¿Deseas que las unidades se guarden como Departamento 1, Departamento 2…?</Label>
                                        <div id="UncontrolledTooltipExample">
                                            <CustomInput type="radio" onChange={event => this.handleInputChange(event)} value="1" id="radioNombre" name="guardarComo" label="Si" />
                                            <CustomInput type="radio" onChange={event => this.handleInputChange(event)} value="0" id="radioNombre2" name="guardarComo" label="No" />
                                        </div>
                                        <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
                                            Las unidades se guardarán como Unidad 1, Unidad 2…
                                        </UncontrolledTooltip>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="justify-content-between">
                                    <Button className="neutralButton" onClick={() => this.props.toggleModal()}>Omitir</Button>
                                    <Button className="confirmButton" onClick={this.agregarUnidades} type="button">Guardar y continuar</Button>
                                </Col>
                            </Row>

                        </Form>
                    </Col>
                </Row>
            </div>
        );
    };


};
