import stringifyData from "./../services/stringifyData";
import {url_base} from "./../constants/api_url";
import CookieService from "../services/CookieService";
import axios from "axios";
import {store} from "react-notifications-component";
const api_url = url_base;
const expiresAt = 60 * 24;
 function login2(credentials) {

    return async dispatch => {

        function onSuccess(success) {
            dispatch({type: '', payload: success});
            return success;
        }

        function onError(error) {
            dispatch({type: '',error});
            return error;
        }

        try {
            const success = await axios({
                url:`${api_url}userLogin`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json, text-plain, */*",
                },
                data: stringifyData(credentials)
            });

            return onSuccess(success);


            /*).then(
                (response) => {return response.data},
            ).catch(error => {
                if (error.response) {

                    if(error.response.data.type == 'usuario') {
                        inputEmail.classList.add('bounce');
                    }
                    if(error.response.data.type == 'password') {
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

                    store.addNotification({
                        title: "error message!",
                        message: "teodosii@react-notifications-component",
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
            });*/
        }catch (e) {
            return onError(e);
        }

    }

};

export const handleLoginSuccess = (response, remember) => {
    if(!remember) {
        const options = {path: '/'};
        CookieService.set('access_token',response.access_token,options);
        CookieService.set('tipoUsuario', response.user.idTipoUsuario, options);

        return true;
    }

    let date = new Date();

    date.setTime(date.getTime() + (expiresAt * 60 * 1000));
    const options = {path: '/', expires: date};

    CookieService.set('access_token', response.access_token, options);
    CookieService.set('tipoUsuario', response.user.idTipoUsuario, options);


    return true;
}

export default function login(params) {
    return async dispatch => {
        function onSuccess(success) {
            dispatch({ type: 'CREATE_USER', payload: success });
            return success;
        }    function onError(error) {
            dispatch({ type: 'ERROR_GENERATED', error });
            return error;
        }    try {
            const success = await axios({
                url:`${api_url}userLogin`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json, text-plain, */*",
                },
                data: stringifyData(params)
            });
            return onSuccess(success);
        } catch (error) {
            return onError(error);
        }
    }
}