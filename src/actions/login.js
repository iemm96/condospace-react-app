import stringifyData from "./../services/stringifyData";
import {url_base} from "./../constants/api_url";
import CookieService from "../services/CookieService";
const api_url = url_base;
const expiresAt = 60 * 24;
export const login = (credentials) => {

    return fetch(`${api_url}login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body:stringifyData(credentials)
    }).then(
            response => {
                return response.json();
        });
};

export const handleLoginSuccess = (response, remember) => {
    if(!remember) {
        const options = {path: '/'};
        CookieService.set('access_token',response.access_token,options);
        CookieService.set('tipoUsuario', response.user.idTipoUsuario, options);

        return true;
    }

    let date = new Date();

    date.setTime(date.getTime() + (expiresAt * 60 * 1000));
    const options = {path: '/', expires: date};

    CookieService.set('access_token', response.access_token, options);
    CookieService.set('tipoUsuario', response.user.idTipoUsuario, options);


    return true;
}