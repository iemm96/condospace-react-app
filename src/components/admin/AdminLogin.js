import React from 'react';
import styles from './assets/admin.scss';
import {login} from "./../../actions/login";
import {handleLoginSuccess} from "./../../actions/login";
import { RouteComponentProps } from 'react-router-dom';
import {FormGroup, Input, Label,Form,Row,Col,Button} from "reactstrap";

const ApiUrl = React.createContext('https://api-letygym.nucleodev.com/');

export default class AdminLogin extends React.Component{

    static contextType = ApiUrl;

    constructor(props) {
        super(props);
        this.state = {
            remember:null
        };

        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        /*
        var inputForm = document.getElementsByClassName('input-form');

        inputForm.addEventListener('change', function () {
            this.classList.remove('bounce');
        });*/
    }



    render() {

        let spinner = <span className="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"/>;
        return (
            <div className="rowLogin row justify-content-center">
                <div id="cardLogin" className="login card card-nav-tabs animate fadeInUp one">
                    <div className="card-body">
                        <form id="formLogin" className="center" onSubmit={this.submitForm}>
                            <h3>Sistema Administrativo CondoSpace</h3>
                            <div className="form-group">
                                <input id="inputEmail" type="text" className="input-form" name="username"
                                       aria-describedby="emailHelp" placeholder="Nombre de Usuario"
                                       onChange={this.clearInput}/>
                            </div>
                            <div className="form-group">
                                <input id="inputPassword" type="password" className="input-form"
                                       name="password"
                                       placeholder="Password" onChange={this.clearInput}/>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" name="remember" value="1" id=""
                                       onChange={event => this.handleInputChange(event)} className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Recordar mis datos</label>
                            </div>

                            <div className="error-box" style={{display: undefined}}>

                            </div>
                            <Button id="btnIngresar" type="submit"  className="actionButton login mt-2">
                                {this.state.loading ? spinner : ''}
                                Iniciar Sesión
                            </Button>
                        </form>
                    </div>
                </div>
            </div>


        );
    }

    handleInputChange = event => {

        console.log(event.target);
        let target;

        if(target = event.target) {
            const value = target.checked;
            const name = target.name;
            this.setState({
                [name]:value
            });

            console.log(this.state.remember);

        }else{
            const name = event.name;
            const value = event.value;
            this.setState({
                [name]:value
            })
        }

    }

    async submitForm(e) {

        this.setState({loading:true});

        e.preventDefault();
        var btnIngresar = document.getElementById('btnIngresar').firstChild;
        var inputEmail = document.getElementById('inputEmail');
        var inputPassword = document.getElementById('inputPassword');
        var cardLogin = document.getElementById('cardLogin');

        cardLogin.classList.remove('animate','one','fadeInUp');

        btnIngresar.data = 'Ingresando';

        const response = await login({email:inputEmail.value,password:inputPassword.value});

        if(response) {
            cardLogin.classList.add('fadeOut');

            handleLoginSuccess(response,this.state.remember);
            window.location.href = '/admin/index';
        }



        /*
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here

            if(xhr.success !== true) {
                if(xhr.type === 'password') {
                    inputPassword.classList.add('bounce');
                }

                if(xhr.type === 'email') {
                    inputEmail.classList.add('bounce');
                }

                btnIngresar.innerText = 'Ingresar';
            }
            console.log(xhr.success)
        });
        // open the request with the verb and the url
        xhr.open('POST', this.context);
        // send the request
        xhr.send();


        if(inputPassword.innerText === '') {
            inputPassword.classList.add('bounce');
        }

        if(inputEmail.innerText === '') {
            inputEmail.classList.add('bounce');
        }

        btnIngresar.innerText = 'Ingresar';


        setTimeout(function () {
            // and call `resolve` on the deferred object, once you're done
            window.location.href = '/admin/index';

        }, 500);*/

    }

    clearInput(e)
    {
        e.target.classList.remove('bounce');
    }

};
