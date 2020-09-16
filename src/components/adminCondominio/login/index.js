import React, {useEffect, useState} from 'react';
import {Button, Col, Form, FormGroup, Row} from "reactstrap";
import {useUsuario} from "../../../context/usuario-context";
import {useForm} from "react-hook-form";
import axios from "axios";
import stringifyData from "../../../services/stringifyData";
import {url_base} from "../../../constants/api_url";
import CookieService from "../../../services/CookieService";
import { withRouter, useHistory} from 'react-router';
import './styles.scss';
import Checkbox from "../common/checkbox";
const expiresAt = 60 * 60;

const UserLogin = (props) => {
    const {idCondominio,setIdCondominio,setTipoUsuario,errorUser,errorPassword,setUsuario} = useUsuario();
    const [esperandoRespuesta, setEsperandoRespuesta] = useState(null);
    const { register, handleSubmit } = useForm();
    const [ recordar, setRecordar ] = useState(false);
    const [ nombreCondominio, setNombreCondominio ] = useState();
    const condominio  = props.match.params.condominio;
    let history = useHistory();

    function validaCondominio(condominio) {
        return axios({
            url:`${url_base}getCondominioByName/${condominio}`,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }).then(
            (response) => {
                setIdCondominio(response.data.idCondominio);
                setNombreCondominio(response.data.nombreCondominio);
                return response.data
            },
            (error) => {
                window.location.href = '/error';
            }
        );
    }

    useEffect(() => {
        validaCondominio(condominio);
    }, []);

    const spinner = <span style={{color:'white'}} className="mt-5 spinner-border spinner-grow" role="status"
                        aria-hidden="true"/>;

    const clearInput = e => {
        const inputEmail = document.getElementById('inputEmail');
        const inputPassword = document.getElementById('inputPassword');
        inputEmail.classList.remove('bounce');
        inputPassword.classList.remove('bounce');
    };

    const onSubmit = (data) => {
        const inputEmail = document.getElementById('inputEmail');
        const inputPassword = document.getElementById('inputPassword');

        setEsperandoRespuesta(true);

        axios({
            url:`${url_base}adminLogin`,
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            data: stringifyData(data)
        }).then(
            (response) => {
                console.log(response.data);
                setUsuario(response.data);
                setTipoUsuario(response.data.user.idTipoUsuario);

                let date = new Date();

                if(recordar) {
                    date.setTime(date.getTime() + (expiresAt * 336 * 1000));
                }else{
                    date.setTime(date.getTime() + (expiresAt * 24 * 1000));
                }

                const options = {path: '/', expires: date};

                CookieService.set('access_token', response.data.access_token, options);

                history.push('/admin/dashboard'); //Redirect al dashboard del administrador

                return response.data
            },
        ).catch(error => {
        setEsperandoRespuesta(false);

        if (error.response) {

                if(error.response.data.type == 'usuario') {
                    inputEmail.classList.add('bounce');
                }
                if(error.response.data.type == 'password') {
                    inputPassword.classList.add('bounce');
                }
            } else if (error.request) {
                console.log(error.request);

            } else {
                console.log('Error', error.message);
            }
        });
    };

    return(
        <div className="row justify-content-center">

            {idCondominio ? <div className="mt-5 login cardLogin amatista card-nav-tabs animate fadeInUp one">
                <div className="card-body">

                    { nombreCondominio && <h3 className="text-center animate fadeInUp one">Iniciar Sesión en { nombreCondominio } </h3>}

                    <Form id="form"  onSubmit={handleSubmit(onSubmit)}>
                        <Row className="animate fadeIn two justify-content-center">
                            <Col sm={8}>
                                <FormGroup>
                                    <input id="inputEmail"
                                           type="email"
                                           className={'input-form' + (errorUser ? ' bounce' : '') }
                                           name="email"
                                           placeholder="Email"
                                           onFocus={(e) => clearInput(e)}
                                           ref={register({ required: true })}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="animate fadeIn two justify-content-center">
                            <Col sm={8}>
                                <FormGroup>
                                    <input id="inputPassword"
                                           type="password"
                                           className={'input-form' + (errorPassword? ' bounce' : '') }
                                           name="password"
                                           onFocus={(e) => clearInput(e)}
                                           placeholder="Password"
                                           ref={register({ required: true })}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <hr className="divider animate fadeIn four" style={{color:'white'}}/>
                        <Row className="mt-3 animate fadeInDown three">
                            <Col>
                                <FormGroup>
                                    <Checkbox setRecordar={setRecordar}>
                                        Recordar Inicio de Sesión  {recordar}
                                    </Checkbox>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="animate fadeInDown three">
                            <Col className="text-center ">
                                <Button type="submit"  className="primary border mt-3">
                                    { esperandoRespuesta ? spinner : ''}
                                    Iniciar Sesión
                                </Button>
                            </Col>
                        </Row>

                    </Form>


                </div>
            </div>
            : spinner}
        </div>

    );
};

export default withRouter(UserLogin);
