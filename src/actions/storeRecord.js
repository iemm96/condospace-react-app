import stringifyData from "./../services/stringifyData";
import {url_base} from "./../constants/api_url";
import axios from "axios";
import CookieService from "../services/CookieService";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import {useUsuario} from "../context/usuario-context";

const api_url = url_base;

export const storeRecord = (payload, resource) => {
    const authToken = CookieService.get('access_token');

    axios({
        url:`${api_url}${resource}`,
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*",
            "Authorization": authToken,
        },
        data: stringifyData(payload)
    }).then(
        (response) => {return response.data},
    ).catch(error => {
        if (error.response) {
            console.log(error.response)
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
};