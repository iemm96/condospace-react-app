import {url_base} from "./../constants/api_url";
import CookieService from "../services/CookieService";
import axios from "axios";
const api_url = url_base;

export const fetchRecordsByParam = (resource,param) => {

    const authToken = CookieService.get('access_token');

    return axios({
        url:`${api_url}${resource}/${param}`,
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": authToken,
        },
    }).then(
        (response) => {return response.data},
        (error) => {console.log(error)}
    );

};