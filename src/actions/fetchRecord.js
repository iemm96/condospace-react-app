import stringifyData from "./../services/stringifyData";
import {url_base} from "./../constants/api_url";
import axios from 'axios';
import CookieService from "../services/CookieService";

const api_url = url_base;

export const fetchRecord = (idRecord,resource) => {

    const authToken = CookieService.get('access_token');

    return axios({
            url:`${api_url}${resource}/${idRecord}`,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken,
            },
        }).then(
            response => {
                if (response) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
        });
};