import React,{useState} from 'react';
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


const AdminLogin = () => {
    const [esperandoRespuesta, setEsperandoRespuesta] = useState(null);
    const {errorUser,errorPassword,setUsuario,setTipoUsuario} = useUsuario();
    const { register, handleSubmit } = useForm();
    const [ recordar, setRecordar ] = useState(false);
    let history = useHistory();

    const spinner = <span className="spinner-border spinner-border-sm" role="status"
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

            <div className="mt-5 login cardLogin card-nav-tabs animate fadeInUp one">
                <div className="card-body">
                    <h3 className="text-center">Sistema Administrativo CondoSpace</h3>
                    <Form id="form"  onSubmit={handleSubmit(onSubmit)}>
                        <Row className="justify-content-center">
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
                        <Row className="justify-content-center">
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
                        <hr className="divider" style={{color:'white'}}/>
                        <Row className="mt-3">
                            <Col>
                                <FormGroup>
                                    <Checkbox setRecordar={setRecordar}>
                                        Recordar Inicio de Sesión  {recordar}
                                    </Checkbox>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <Button type="submit"  className="primary border mt-3">
                                    { esperandoRespuesta ? spinner : ''}
                                    Iniciar Sesión
                                </Button>
                            </Col>
                        </Row>

                    </Form>


                </div>
            </div>
        </div>

    );
};

export default withRouter(AdminLogin);
