import stringifyData from "./../services/stringifyData";
import {url_base} from "./../constants/api_url";
const api_url = url_base;

export const updateRecord = (payload,resource,record) => {
    return dispatch => {
        fetch(`${api_url}${resource}/${record}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body:stringifyData(payload)
        }).then((res) => res.json())
            .then((data) =>  {
                window.location.reload();
            })
            .catch((err)=>console.log(err));
    };
};