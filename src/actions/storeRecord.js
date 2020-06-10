import stringifyData from "./../services/stringifyData";
import {url_base} from "./../constants/api_url";
import axios from "axios";
import CookieService from "../services/CookieService";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import {useUsuario} from "../context/usuario-context";

const api_url = url_base;

export const storeRecord = async (payload, resource) => {
    const authToken = CookieService.get('access_token');

    try {
         const response = await axios({
            url:`${api_url}${resource}`,
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
                "Authorization": 'Bearer ' + authToken,
            },
            data: stringifyData(payload)
        });

         if(response) {
             return response.data;
         }
    }catch (e) {
        throw e;
    }
};