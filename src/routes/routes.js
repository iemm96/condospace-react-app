import React, {useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminLogin from "../components/admin/AdminLogin";
import AdminDashboard from "../components/admin";
import Condominio from "../components/admin/sections/Condominio";
import {DashboardContainerWithRouter} from "../components/adminCondominio/DashboardContainer";
import {AdminCondominioDashboard2} from "../components/adminCondominio/AdminCondominioDashboard2";

import AnunciosTable from "./../components/adminCondominio/tables/AnunciosTable";
import UnidadTable from "../components/adminCondominio/tables/UnidadTable";
import FinanzasTable from "../components/adminCondominio/tables/FinanzasTable";
import EventosTable from "../components/adminCondominio/tables/EventosTable";
import VisitasTable from "../components/adminCondominio/tables/VisitasTable";
import AreaTable from "../components/adminCondominio/tables/AreaTable";
import UsuarioTable from "../components/adminCondominio/tables/UsuarioTable";
import CuotaTable from "../components/adminCondominio/tables/CuotaTable";
import CuentaTable from "../components/adminCondominio/tables/CuentaTable";
import CookieService from "../services/CookieService";
import CondominioList from "../components/adminCondominio/lists/CondominioList";
import UsuariosTable from "../components/admin/tables/UsuariosTable";
import Login from "../Login";
import Bienvenida from "../components/adminCondominio/sections/Bienvenida";
import axios from "axios";
import {url_base} from "../constants/api_url";
import AgregarUnidades from "../components/adminCondominio/sections/AgregarUnidades";
const api_url = url_base;

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
    <BrowserRouter>
        <Switch>
            <Route path="/admin/login" component={AdminLogin}/>
            <Route path="/:condominio/login" component={Login} exact/>

            {routesAdmin}
            {routesAdminCondominio}
        </Switch>
    </BrowserRouter>);
};

export default AppRoutes;