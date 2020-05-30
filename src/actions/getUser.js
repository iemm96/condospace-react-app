import stringifyData from "./../services/stringifyData";
import {url_base} from "./../constants/api_url";
import axios from 'axios';
import CookieService from "../services/CookieService";

const api_url = url_base;

export const getUser = (authToken) => {


    return axios({
            url:`${api_url}user`,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
        }).then(
            (response) => {
                return response.data
            },
            (error) => {
                throw new Error(error);
            }
        );
};