import React from 'react';
import { Button, Form, FormGroup, Label, input, Col, Row } from 'reactstrap';

import stringifyData from "../../../services/stringifyData";
import {url_base} from "../../../constants/api_url";
import CookieService from "../../../services/CookieService";
import {useForm} from "react-hook-form";
import {useHistory} from 'react-router';
import Container from "reactstrap/es/Container";
import {useUsuario} from "../../../context/usuario-context";
const api_url = url_base;

const Bienvenida = (props) => {
    const { register, handleSubmit } = useForm();
    const { usuario } = useUsuario();
    let history = useHistory();

    const updatePasword = (data) => {
        const authToken = CookieService.get('access_token');

        fetch(`${api_url}updateUserPassword`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
                "Authorization": 'Bearer ' + authToken,
            },
            body:stringifyData(data)
        }).then((res) => res.json())
            .then((data) =>  {
                if(usuario.user.idTipoUsuario === 2) {
                    history.push(`/${props.match.params.condominio}/agregarUnidades`);
                }

                if(usuario.user.idTipoUsuario === 3) {
                    history.push(`/${props.match.params.condominio}/residente/dashboard`);
                }

            })
            .catch((err)=>console.log(err));
    };

    const onSubmit = async data => {

        if(data.rtpassword !== data.password) {
            alert('Las contraseñas no coinciden');
            return;
        }

        await updatePasword(data);

    };

    return(
        <Container>
            <Row className="text-center">
                <Col >
                    <h4>¡Te damos la bienvenida a CondoSpace!</h4>
                    <p>Antes de continuar es necesario definir una contraseña</p>
                </Col>
            </Row>
            <Row className="justify-content-end">
                <Col sm={8}>
                    <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>*Contraseña</Label>
                                    <input type="password"
                                           name="password"
                                           className="form-control"
                                           ref={register({required:true})}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>*Confirma tu contraseña</Label>
                                    <input type="password"
                                           name="rtpassword"
                                           className="form-control"
                                           ref={register({required:true})}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button className="confirmButton" type="submit">Guardar y continuar</Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
    
}

export default Bienvenida;