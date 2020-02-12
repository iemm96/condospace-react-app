import stringifyData from "./../services/stringifyData";
import {url_base} from "./../constants/api_url";
const api_url = url_base;

export const fetchRecord = (idRecord,resource) => {

    return response => {
        fetch(`${api_url}${resource}/${idRecord}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }

        }).then(
            response
        );
    };
};