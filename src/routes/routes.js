import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {AdminLogin} from "../components/admin/AdminLogin";
import AdminDashboard from "../components/admin";
import {DashboardContainerWithRouter} from "../components/adminCondominio/DashboardContainer";

import AnunciosTable from "./../components/adminCondominio/tables/AnunciosTable";
import UnidadTable from "../components/adminCondominio/tables/UnidadTable";
import FinanzasTable from "../components/adminCondominio/tables/FinanzasTable";
import EventosTable from "../components/adminCondominio/tables/EventosTable";
import VisitasTable from "../components/adminCondominio/tables/VisitasTable";
import UsuarioTable from "../components/adminCondominio/tables/UsuarioTable";
import CuotaTable from "../components/adminCondominio/tables/CuotaTable";
import CuentaTable from "../components/adminCondominio/tables/CuentaTable";
import CookieService from "../services/CookieService";
import CondominioList from "../components/adminCondominio/lists/CondominioList";
import UsuariosTable from "../components/admin/tables/UsuariosTable";
import {UserLogin} from "../UserLogin";
import Bienvenida from "../components/adminCondominio/sections/Bienvenida";
import {AgregarUnidades} from "../components/adminCondominio/sections/AgregarUnidades";
import {UsuarioProvider} from "../context/usuario-context";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const NoMatchPage = () => {  return (    <h3>404 - Not found</h3>  );};

const AppRoutes = () => {
    const tipoUsuario = CookieService.get('tipoUsuario');
    const authToken = CookieService.get('access_token');

    let routesAdminCondominio = '';
    let routesAdmin = '';

    console.log(tipoUsuario);

    if(tipoUsuario == 1) {
        routesAdmin =
            <Route path="/admin">
                <AdminDashboard>
                    <Route path="/admin/index" component={CondominioList}/>
                    <Route path="/admin/condominio/:idCondominio" component={UsuariosTable}/>
                </AdminDashboard>
            </Route>;
    }

    if(tipoUsuario == 2) {
        routesAdminCondominio = <Route path="/:condominio">
            <DashboardContainerWithRouter>
                <Route path="/:condominio/anuncios" components={AnunciosTable} />
                <Route path="/:condominio/unidades" component={UnidadTable} />
                <Route path="/:condominio/agregarUnidades" component={AgregarUnidades} />
                <Route path="/:condominio/bienvenida" component={Bienvenida} />
                <Route path="/:condominio/finanzas" component={FinanzasTable} />
                <Route path="/:condominio/eventos" component={EventosTable} />
                <Route path="/:condominio/visitas" component={VisitasTable} />
                <Route path="/:condominio/usuarios" component={UsuarioTable} />
                <Route path="/:condominio/cuotas" component={CuotaTable} />
                <Route path="/:condominio/cuentas" component={CuentaTable} />

            </DashboardContainerWithRouter >
        </Route>;
    }

    return (
        <div className="app-container">
            <ReactNotification/>
            <UsuarioProvider>
                <BrowserRouter>
                    <Switch>
                        <Route path="/admin/login" component={AdminLogin}/>
                        <Route path="/:condominio/login" component={UserLogin} exact/>

                        {routesAdmin}
                        {routesAdminCondominio}
                        <Route path="/error" component={NoMatchPage} />
                        <Route component={NoMatchPage} />
                    </Switch>
                </BrowserRouter>
            </UsuarioProvider>
        </div>
    );
};

export default AppRoutes;