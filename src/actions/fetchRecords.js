import {url_base} from "./../constants/api_url";
import CookieService from "../services/CookieService";
import axios from "axios";
const api_url = url_base;

export const fetchRecords = async (resource,idCondominio) => {

    const authToken = CookieService.get('access_token');

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
        "idCondominio": idCondominio
    };

    if(idCondominio) {
        headers.idCondominio = idCondominio;
    }

    const options = {
        url:`${api_url}${resource}`,
        method: 'GET',
        headers: headers,
    };

    try {
        const response = await axios(options);

        if(response) {
            return response.data;
        }
    }catch (e) {
        throw e;
    }

};