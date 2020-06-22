import stringifyData from "./../services/stringifyData";
import {url_base} from "./../constants/api_url";
import CookieService from "../services/CookieService";
import axios from "axios";
const api_url = url_base;

export const updateRecord = async (payload,resource,record,idCondominio) => {

    const authToken = CookieService.get('access_token');

    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "Authorization": 'Bearer ' + authToken,
    };

    if(idCondominio) {
        headers.idCondominio = idCondominio;
    }

    const options = {
        url:`${api_url}${resource}/${record}`,
        method: 'PUT',
        headers: headers,
        data: stringifyData(payload)
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