import React, {useState,useEffect, useMemo} from 'react';
import CookieService from "../services/CookieService";
import {getUser} from "../actions/getUser";

const UsuarioContext = React.createContext();

export function UsuarioProvider (props) {
    const [usuario,setUsuario] = useState(null);
    const [idCondominio,setIdCondominio] = useState(null);
    const [urlCondominio,setUrlCondominio] = useState(null);
    const [tipoUsuario,setTipoUsuario] = useState(null);
    const [cargandoUsuario,setCargandoUsuario] = useState(false);
    const [userLoggedIn,setUserLoggedIn] = useState(false);
    const [primerInicio,setPrimerInicio] = useState(false);
    const [cargandoRequest,setCargandoRequest] = useState(false);
    const [notificacion,setNotificacion] = useState(null);
    const [tema,setTema] = useState('aqua');
    const [fondo,setFondo] = useState('white');

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        return function cleanup() {
            abortController.abort();
        }
    },[]);

    useEffect(() => {

        async function cargarUsuario() {

            try{

                /*
                const accessToken = CookieService.get('access_token');

                //Si el token existe carga el usuario en el contexto
                if(accessToken === undefined) {
                    setUserLoggedIn(false);
                    return;
                }

                //Se obtiene una respuesta del servidor con los datos del usuario, de existir se setea en el contexto
                const response = await getUser(accessToken);

                if(response) {
                    setUsuario(response);
                    setIdCondominio(response.user.idCondominio);
                    setCargandoUsuario(false);
                    setUserLoggedIn(true);

                    if(response.user.tema) {
                        setTema(response.user.tema);
                    }

                    if(response.user.fondo) {
                        setFondo(response.user.fondo);
                    }
                }*/
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
            primerInicio,
            urlCondominio,
            setUrlCondominio,
            setPrimerInicio,
            cargandoRequest,
            setUsuario,
            setIdCondominio,
            setTipoUsuario,
            tipoUsuario,
            userLoggedIn,
            setCargandoUsuario,
            setNotificacion,
            setUserLoggedIn,
            setTema,
            tema,
            fondo,
            setFondo
        });
    },[primerInicio,setPrimerInicio,usuario,fondo,tema,userLoggedIn,cargandoUsuario,cargandoRequest,setIdCondominio,idCondominio,tipoUsuario,setTipoUsuario,setCargandoUsuario,setNotificacion]);

    return <UsuarioContext.Provider value={value} {...props}/>
}

export function useUsuario() {
    const context = React.useContext(UsuarioContext);
    if(!context) {
        throw new Error('useUsuario debe estar dentro del proveedor UsuarioContext');
    }
    return context;
}