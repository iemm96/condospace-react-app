import {url_base} from "./../constants/api_url";
const api_url = url_base;

export const fetchRecords = (resource) => {

    return fetch(`${api_url}${resource}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }).then(
            response => (response.json())
        );

};