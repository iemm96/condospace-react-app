import {url_base} from "./../constants/api_url";
const api_url = url_base;

export const deleteRecord = (idRecord,resource) => {
    return fetch(`${api_url}${resource}/${idRecord}`, {
        method: 'DELETE',
    }).then(
        () => {window.location.reload()}
        //response => (response.json())
    )
};