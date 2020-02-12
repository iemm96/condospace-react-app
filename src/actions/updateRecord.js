import stringifyData from "./../services/stringifyData";
import {url_base} from "./../constants/api_url";
const api_url = url_base;

export const updateRecord = (payload, resource) => {
    return dispatch => {
        fetch(`${api_url}${resource}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body:stringifyData()
        }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err));
    };
};