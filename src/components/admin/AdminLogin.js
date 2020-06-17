import React,{useState} from 'react';
import {Button} from "reactstrap";
import {useUsuario} from "../../context/usuario-context";
import {useForm} from "react-hook-form";
import axios from "axios";
import stringifyData from "../../services/stringifyData";
import {url_base} from "../../constants/api_url";
import CookieService from "../../services/CookieService";
import { withRouter, useHistory} from 'react-router';

const expiresAt = 60 * 24;


const AdminLogin = () => {

    const [esperandoRespuesta, setEsperandoRespuesta] = useState(null);
    const {errorUser,errorPassword,setUsuario,setTipoUsuario} = useUsuario();
    const { register, handleSubmit } = useForm();
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

                date.setTime(date.getTime() + (expiresAt * 60 * 1000));
                const options = {path: '/', expires: date};

                CookieService.set('access_token', response.data.access_token, options);

                history.push('/admin/index');
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
        <div className="rowLogin row justify-content-center">
            <div id="cardLogin" className="login card card-nav-tabs animate fadeInUp one">
                <div className="card-body">
                    <form id="formLogin" className="center" onSubmit={handleSubmit(onSubmit)}>
                        <h3>Sistema Administrativo CondoSpace</h3>
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
        </div>

    );
};

export default withRouter(AdminLogin);
