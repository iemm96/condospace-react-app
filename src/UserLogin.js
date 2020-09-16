import React,{useState,useEffect} from 'react';
import {Button} from "reactstrap";
import {useUsuario} from "./context/usuario-context";
import {useForm} from "react-hook-form";
import axios from "axios";
import stringifyData from "./services/stringifyData";
import {url_base} from "./constants/api_url";
import CookieService from "./services/CookieService";
import { withRouter, Redirect, useHistory} from 'react-router';
import Spinner from "reactstrap/es/Spinner";
const expiresAt = 60 * 24;

const UserLogin = (props) => {
    const {usuario,idCondominio,setIdCondominio,setTipoUsuario,errorUser,errorPassword,setUsuario,setUserLoggedIn,setFondo,setTema} = useUsuario();
    const [esperandoRespuesta, setEsperandoRespuesta] = useState(null);
    const { register, handleSubmit, errors } = useForm();
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
                setIdCondominio(response.data);
                return response.data
            },
            (error) => {
            }
        );
    }

    useEffect(() => {
        validaCondominio(condominio);
    }, []);

    const spinner = <span className="spinner-border spinner-border-sm" role="status"
                          aria-hidden="true"/>;

    const clearInput = e => {
        const inputEmail = document.getElementById('inputEmail');
        const inputPassword = document.getElementById('inputPassword');
        inputEmail.classList.remove('bounce');
        inputPassword.classList.remove('bounce');
    }

    function onSubmit(data) {
        const inputEmail = document.getElementById('inputEmail');
        const inputPassword = document.getElementById('inputPassword');

        console.log(idCondominio);
        data.idCondominio = idCondominio;

        setEsperandoRespuesta(true);
        console.log('esperando respuesta: ' + esperandoRespuesta);
        axios({
            url:`${url_base}userLogin`,
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

                if(!response.data.user.fondo) {
                    setFondo('white');
                }

                if(!response.data.user.tema) {
                    setTema('aqua');
                }

                setFondo(response.data.user.fondo);
                setTema(response.data.user.tema);
                const tipoUsuario = response.data.user.idTipoUsuario;
                setTipoUsuario(tipoUsuario);

                let date = new Date();

                date.setTime(date.getTime() + (expiresAt * 60 * 1000));
                const options = {path: '/', expires: date};

                CookieService.set('access_token', response.data.access_token, options);

                setUserLoggedIn(true);

                if(tipoUsuario === 2) {
                    if(response.data.user.bPrimerInicio) {
                        history.push(`/${condominio}/bienvenida`);
                    }else{
                        history.push(`/${condominio}/dashboard`);
                    }
                }

                if(tipoUsuario === 3) {

                    if(response.data.user.bPrimerInicio) {
                        history.push(`/${condominio}/residente/bienvenida`);
                    }else{
                        history.push(`/${condominio}/residente/dashboard`);
                    }

                }

                if(tipoUsuario === 4) {
                    history.push(`/${condominio}/vigilante`);
                }

                return response.data
            },
        ).catch(error => {
            setEsperandoRespuesta(false);

            if (error.response) {

                if(error.response.data.type === 'usuario') {
                    inputEmail.classList.add('bounce');
                }
                if(error.response.data.type === 'password') {
                    inputPassword.classList.add('bounce');
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);


            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);

            }
        });

    }

    return(

        <div className="rowLogin row justify-content-center">
            {idCondominio ?  <div id="cardLogin" className="login card card-nav-tabs animate fadeInUp one">
                <div className="card-body">
                    <form id="formLogin" className="center" onSubmit={handleSubmit(onSubmit)}>
                        <h3>Bienvenid@ a CondoSpace</h3>
                        <div className="form-group">
                            <input id="inputEmail"
                                   type="email"
                                   className={'input-form' + (errorUser ? ' bounce' : '') }
                                   name="email"
                                   placeholder="Email"
                                   onFocus={(e) => clearInput(e)}
                                   ref={register({ required: true })}
                            />
                        </div>
                        <div className="form-group">
                            <input id="inputPassword"
                                   type="password"
                                   className={'input-form' + (errorPassword? ' bounce' : '') }
                                   name="password"
                                   onFocus={(e) => clearInput(e)}
                                   placeholder="Password"
                                   ref={register({ required: true })}

                            />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" name="remember" value="1" id=""
                                   className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Recordar mis datos</label>
                        </div>

                        <div className="error-box" style={{display: undefined}}>

                        </div>
                        <Button id="btnIngresar" type="submit"  className="actionButton login mt-2">
                            {esperandoRespuesta ? spinner : ''}
                            Iniciar Sesión
                        </Button>
                    </form>
                </div>
            </div>
            : <Spinner animation="grow" />}

        </div>

    );

};

export default withRouter(UserLogin);
