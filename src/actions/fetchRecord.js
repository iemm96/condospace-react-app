import stringifyData from "./../services/stringifyData";
import {url_base} from "./../constants/api_url";
import axios from 'axios';
import CookieService from "../services/CookieService";

const api_url = url_base;

export const fetchRecord = async (idRecord,resource) => {

    const authToken = CookieService.get('access_token');

    try{
        const response = await axios({
            url:`${api_url}${resource}/${idRecord}`,
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
        console.log(e);
    }
};

