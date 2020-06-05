import React, {useState,useEffect, useMemo} from 'react';
import CookieService from "../services/CookieService";
import {getUser} from "../actions/getUser";

const UsuarioContext = React.createContext();

export function UsuarioProvider (props) {
    const [usuario,setUsuario] = useState(null);
    const [idCondominio,setIdCondominio] = useState(null);
    const [tipoUsuario,setTipoUsuario] = useState(null);
    const [cargandoUsuario,setCargandoUsuario] = useState(false);
    const [cargandoRequest,setCargandoRequest] = useState(false);
    const [notificacion,setNotificacion] = useState(null);

    useEffect(() => {

        async function cargarUsuario() {
            const accessToken = CookieService.get('access_token');

            //Si el token existe carga el usuario en el contexto
            if(!accessToken) {
                setCargandoUsuario(false);
                return;
            }

            try{
                //Se obtiene una respuesta del servidor con los datos del usuario, de existir se setea en el contexto
                const response = await getUser(accessToken);
                if(response) {
                    setUsuario(response);
                    setIdCondominio(response.user.idCondominio);
                    setCargandoUsuario(false);
                }
            }catch (e) {
                console.log(e);
            }
        }

        cargarUsuario();
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
            setCargandoUsuario,
            setNotificacion
        });
    },[usuario,cargandoUsuario,cargandoRequest,setIdCondominio,idCondominio,tipoUsuario,setTipoUsuario,setCargandoUsuario,setNotificacion]);

    return <UsuarioContext.Provider value={value} {...props}/>
}

export function useUsuario() {
    const context = React.useContext(UsuarioContext);
    if(!context) {
        throw new Error('useUsuario debe estar dentro del proveedor UsuarioContext');
    }
    return context;
}