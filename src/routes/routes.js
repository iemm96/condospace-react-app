import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminLogin from "../components/admin/login";
import {Admin} from "../components/admin";

import {DashboardContainerWithRouter} from "../components/adminCondominio/UserDashboard";

import AnunciosTable from "./../components/adminCondominio/tables/AnunciosTable";
import UnidadTable from "../components/adminCondominio/tables/UnidadTable";
import EventosTable from "../components/adminCondominio/tables/EventosTable";
import VisitasTable from "../components/adminCondominio/tables/VisitasTable";
import CuentaTable from "../components/adminCondominio/tables/CuentaTable";
import TransaccionesTable from "../components/adminCondominio/tables/TransaccionesTable";

import UsuariosTable from "../components/adminCondominio/tables/UsuariosTable";
import Bienvenida from "../components/adminCondominio/sections/Bienvenida";
import {AgregarUnidades} from "../components/adminCondominio/sections/AgregarUnidades";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import AreaTable from "../components/adminCondominio/tables/AreaTable";
import AdmincondoDashboard from "../components/adminCondominio/sections/AdmincondoDashboard";
import {Perfil} from "../components/adminCondominio/sections/Perfil";
import CuotaTableResidente from "../components/residente/tables/CuotaTable";
import ResidenteDashboard from "../components/residente/sections/ResidenteDashboard";
import EventosTableResidente from "../components/residente/tables/EventosTable";
import AnunciosTableResidente from "../components/residente/tables/AnunciosTable";
import {ResidenteContainerWithRouter} from "../components/residente/ResidenteContainer";
import {useUsuario} from "../context/usuario-context";
import {ResidentePerfil} from "../components/residente/sections/ResidentePerfil";
import Cuotas from "../components/adminCondominio/sections/Cuotas";
import UsuariosCondominio from "../components/admin/usuariosCondominio";
import {Dashboard} from "../components/admin/dashboard";
import FormularioUsuariosCondominio from "../components/admin/usuariosCondominio/formulario";
import UserLogin from "../components/adminCondominio/login";
import AdminCondominio from "../components/adminCondominio";
import CookieService from "../services/CookieService";
import {getUser} from "../actions/getUser";

const NoMatchPage = () => (<h3>404 - Not found</h3>);
const PermissionDenied = () => (<h3>403 - No tienes permiso para acceder a esta sección</h3>);

const AppRoutes = () => {
    const { usuario, setUserLoggedIn,setUsuario,setTipoUsuario } = useUsuario();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        async function auth() {
            const accessToken = CookieService.get('access_token');

            //Si el token existe carga el usuario en el contexto
            if(accessToken === undefined) {
                setUserLoggedIn(false);
                setIsLoading(false);
                return;
            }

            //Se obtiene una respuesta del servidor con los datos del usuario, de existir se setea en el contexto
            const response = await getUser(accessToken);

            if(response) {

                setUsuario(response);
                setTipoUsuario(response.user.idTipoUsuario);

            }

            setIsLoading(false);
        }

        auth();
    },[]);

    const spinnerGrow = <span style={{color:'white',marginLeft:'50%',marginRight:'50%',position:'relative'}} className="mt-5 spinner-border spinner-grow" role="status"
                              aria-hidden="true"/>;

    const CondoAdminRoutes = (
        <AdminCondominio>
            <Route exact path="/:condominio/dashboard" component={AdmincondoDashboard} />
            <Route exact path="/:condominio/agregarUnidades" component={AgregarUnidades} />
            <Route exact path="/:condominio/areas" component={AreaTable} />
            <Route exact path="/:condominio/anuncios" component={AnunciosTable} />
            <Route exact path="/:condominio/bienvenida" component={Bienvenida} />
            <Route exact path="/:condominio/cuotas" component={Cuotas} />
            <Route exact path="/:condominio/cuentas" component={CuentaTable} />
            <Route exact path="/:condominio/eventos" component={EventosTable} />
            <Route exact path="/:condominio/usuarios" component={UsuariosTable} />
            <Route exact path="/:condominio/transacciones" component={TransaccionesTable} />
            <Route exact path="/:condominio/unidades" component={UnidadTable} />
            <Route exact path="/:condominio/visitas" component={VisitasTable} />
            <Route exact path="/:condominio/perfil" component={Perfil} />
        </AdminCondominio >
    );

    const ResidenteRoutes = (
        <ResidenteContainerWithRouter>
            <Route exact path="/:condominio/residente/bienvenida" component={Bienvenida} />
            <Route exact path="/:condominio/residente/dashboard" component={ResidenteDashboard} />
            <Route exact path="/:condominio/residente/perfil" component={ResidentePerfil} />
            <Route exact path="/:condominio/residente/cuotas" component={CuotaTableResidente} />
            <Route exact path="/:condominio/residente/eventos" component={EventosTableResidente} />
            <Route exact path="/:condominio/residente/anuncios" component={AnunciosTableResidente} />
            <Route exact path="/:condominio/vigilante" component={VisitasTable} />
        </ResidenteContainerWithRouter>
    );

    return (
        <div className="app-container">
            <ReactNotification/>
            {isLoading ? spinnerGrow : <BrowserRouter>
                <Switch>

                    <Route exact path="/:condominio" component={() => <UserLogin/>} />




                    <Route exact path="/error/404" component={NoMatchPage} />
                    <Route exact path="/error/403" component={PermissionDenied} />

                    <Route exact path="/admin/login" component={() => <AdminLogin/>} exact/>

                    {usuario?.user.idTipoUsuario === 2 ? CondoAdminRoutes : ''}
                    {usuario?.user.idTipoUsuario === 3 ? ResidenteRoutes : ''}

                    <Admin>
                        <Route exact path="/admin/index" component={Dashboard}/>
                        <Route exact path="/admin/usuariosCondominio/:idCondominio" component={UsuariosCondominio}/>
                        <Route exact path="/admin/usuariosCondominio/:idCondominio/agregar" component={FormularioUsuariosCondominio}/>
                        <Route path="/admin/usuariosCondominio/:idCondominio/editar/:idRecord" component={FormularioUsuariosCondominio}/>
                    </Admin>



                    <Route path="/:condominio/dashboard">

                    </Route>


                </Switch>
            </BrowserRouter>}

        </div>
    );
};

export default AppRoutes;