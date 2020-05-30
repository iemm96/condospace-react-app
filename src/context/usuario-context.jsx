import React, {useState,useEffect, useMemo} from 'react';
import CookieService from "../services/CookieService";
import axios from 'axios';
import {getUser} from "../actions/getUser";

const UsuarioContext = React.createContext();

export function UsuarioProvider (props) {
    const [usuario,setUsuario] = useState(null);
    const [idCondominio,setIdCondominio] = useState(null);
    const [cargandoUsuario,setCargandoUsuario] = useState(true);

    useEffect(() => {
        async function getUserToken() {
            const authToken = CookieService.get('access_token');
            if(!authToken) {
                setCargandoUsuario(false);
                return;
            }

            try {
                const response = await getUser(authToken);
                setUsuario(response);
                setIdCondominio(response.user.idCondominio);
                setCargandoUsuario(false);
            }catch (e) {
                console.log(e);
            }
        }
        getUserToken();
    },[]);

    
    const value = useMemo(() => {
        return ({
            usuario,
            cargandoUsuario,
            idCondominio
        });
    },[usuario,cargandoUsuario]);

    return <UsuarioContext.Provider value={value} {...props}/>
}

export function useUsuario() {
    const context = React.useContext(UsuarioContext);
    if(!context) {
        throw new Error('useUsuario debe estar dentro del proveedor UsuarioContext');
    }
    return context;
}