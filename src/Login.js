import React from 'react';
import './styles/style.scss';
import {login} from "./actions/login";
import {handleLoginSuccess} from "./actions/login";
import { RouteComponentProps } from 'react-router-dom';
import {FormGroup, Input, Label} from "reactstrap";

const ApiUrl = React.createContext('https://api-letygym.nucleodev.com/');

export default class Login extends React.Component{

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
        return (
            <div className="row justify-content-center h-100">
                    <div id="cardLogin" className="login card card-nav-tabs animate fadeInUp one">
                        <div className="card-body">
                            <form id="formLogin" className="center" onSubmit={this.submitForm}>
                                <h3>Bienvenid@ a CondoSpace</h3>
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
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="remember" value="1" id=""
                                               onChange={event => this.handleInputChange(event)}/>{' '}
                                        Recuérdame
                                    </Label>
                                </FormGroup>
                                <div className="error-box" style={{display: undefined}}>

                                </div>
                                <button id="btnIngresar" type="submit" className="">Ingresar</button>
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

        e.preventDefault();
        var btnIngresar = document.getElementById('btnIngresar').firstChild;
        var xhr = new XMLHttpRequest();
        var inputEmail = document.getElementById('inputEmail');
        var inputPassword = document.getElementById('inputPassword');
        var cardLogin = document.getElementById('cardLogin');

        cardLogin.classList.remove('animate','one','fadeInUp');

        cardLogin.classList.add('fadeOut');

        btnIngresar.data = 'Ingresando';

        const response = await login({username:inputEmail.value,password:inputPassword.value});

        if(response) {
            //this.props.history.push('/admin/index');
            handleLoginSuccess(response,this.state.remember);

        }
        console.log(response);

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
