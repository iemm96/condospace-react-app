import Cookie from  'universal-cookie';

const cookie = new Cookie();

export default class CookieService {
    static get = (key) => {
        return cookie.get(key);
    };

    static set = (key, value, options) => {
        cookie.set(key,value,options);
    };

    static remove = (key) => {
        cookie.remove(key);
    };
}
