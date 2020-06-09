import {url_base} from "./../constants/api_url";
import CookieService from "../services/CookieService";
import axios from "axios";
const api_url = url_base;

export const fetchRecordsByParam = async (resource,param) => {

    const authToken = CookieService.get('access_token');

    try {
        const response =  await axios({
            url:`${api_url}${resource}/${param}`,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + authToken,
            },
        });

        if(response) {
            return response.data;
        }
    }catch (e) {
        return e;
    }

};