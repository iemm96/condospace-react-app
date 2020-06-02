import React, {useState,useEffect, useMemo} from 'react';
import CookieService from "../services/CookieService";
import axios from 'axios';
import {getUser} from "../actions/getUser";
import stringifyData from "../services/stringifyData";
import {url_base} from "./../constants/api_url";

const UsuarioContext = React.createContext();

export function UsuarioProvider (props) {
    const [usuario,setUsuario] = useState(null);
    const [idCondominio,setIdCondominio] = useState(null);
    const [tipoUsuario,setTipoUsuario] = useState(null);
    const [cargandoUsuario,setCargandoUsuario] = useState(true);
    const [cargandoRequest,setCargandoRequest] = useState(false);

    const getUser = async () => {
        try {
            const authToken = CookieService.get('access_token');
            const response = await getUser(authToken);
            setUsuario(response);
            setIdCondominio(response.user.idCondominio);
            setCargandoUsuario(false);
            return response.data;
        } catch (error) {
            throw error;
        }
    };



    const value = useMemo(() => {
        return ({
            usuario,
            cargandoUsuario,
            idCondominio,
            cargandoRequest,
            setUsuario,
            setIdCondominio,
            setTipoUsuario,
            tipoUsuario,

        });
    },[usuario,cargandoUsuario,cargandoRequest,setIdCondominio,idCondominio,setUsuario,tipoUsuario,setTipoUsuario]);

    return <UsuarioContext.Provider value={value} {...props}/>
}

export function useUsuario() {
    const context = React.useContext(UsuarioContext);
    if(!context) {
        throw new Error('useUsuario debe estar dentro del proveedor UsuarioContext');
    }
    return context;
}