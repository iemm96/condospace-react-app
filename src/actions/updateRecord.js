import stringifyData from "./../services/stringifyData";
import {url_base} from "./../constants/api_url";
import CookieService from "../services/CookieService";
import axios from "axios";
const api_url = url_base;

export const updateRecord = async (payload,resource,record) => {

    const authToken = CookieService.get('access_token');

    try {
        const response = await axios({
            url:`${api_url}${resource}/${record}`,
            method: 'PUT',
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