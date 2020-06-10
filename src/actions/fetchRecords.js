import {url_base} from "./../constants/api_url";
import CookieService from "../services/CookieService";
import axios from "axios";
const api_url = url_base;

export const fetchRecords = async (resource) => {

    const authToken = CookieService.get('access_token');

    try {
        const response = await axios({
            url:`${api_url}${resource}`,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken,
            },
        });

        if(response) {
            return response.data;
        }
    }catch (e) {
        throw e;
    }

};