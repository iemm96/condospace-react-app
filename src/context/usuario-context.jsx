import React, {useState,useEffect, useMemo} from 'react';
import CookieService from "../services/CookieService";
import {getUser} from "../actions/getUser";
import { withRouter, Redirect, useHistory} from 'react-router';

const UsuarioContext = React.createContext();

export function UsuarioProvider (props) {
    const [usuario,setUsuario] = useState(null);
    const [idCondominio,setIdCondominio] = useState(null);
    const [tipoUsuario,setTipoUsuario] = useState(null);
    const [cargandoUsuario,setCargandoUsuario] = useState(false);
    const [userLoggedIn,setUserLoggedIn] = useState(false);
    const [cargandoRequest,setCargandoRequest] = useState(false);
    const [notificacion,setNotificacion] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        return function cleanup() {
            abortController.abort();
        }
    },[]);

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
            userLoggedIn,
            setCargandoUsuario,
            setNotificacion,
            setUserLoggedIn
        });
    },[usuario,userLoggedIn,cargandoUsuario,cargandoRequest,setIdCondominio,idCondominio,tipoUsuario,setTipoUsuario,setCargandoUsuario,setNotificacion]);

    return <UsuarioContext.Provider value={value} {...props}/>
}

export function useUsuario() {
    const context = React.useContext(UsuarioContext);
    if(!context) {
        throw new Error('useUsuario debe estar dentro del proveedor UsuarioContext');
    }
    return context;
}