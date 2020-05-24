import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "../Login";
import AdminDashboard from "../components/admin";
import Area from "../components/admin/sections/Area";
import Anuncios from "../components/admin/sections/Anuncios";
import Eventos from "../components/admin/sections/Eventos";
import Finanzas from "../components/admin/sections/Finanzas";
import Categoria from "../components/admin/sections/Categoria";
import Cuota from "../components/admin/sections/Cuota";
import Unidad from "../components/admin/sections/Unidad";
import Vehiculo from "../components/admin/sections/Vehiculo";
import Visitante from "../components/admin/sections/Visitante";
import Cuenta from "../components/admin/sections/Cuenta";
import Condominio from "../components/admin/sections/Condominio";
import Persona from "../components/admin/sections/Persona";
import {AdminCondominioDashboard} from "../components/adminCondominio/AdminCondominioDashboard";

import AnunciosTable from "./../components/adminCondominio/tables/AnunciosTable";
import UnidadTable from "../components/adminCondominio/tables/UnidadTable";
import FinanzasTable from "../components/adminCondominio/tables/FinanzasTable";
import EventosTable from "../components/adminCondominio/tables/EventosTable";
import VisitasTable from "../components/adminCondominio/tables/VisitasTable";
import AreaTable from "../components/adminCondominio/tables/AreaTable";
import UsuarioTable from "../components/adminCondominio/tables/UsuarioTable";
import CuotaTable from "../components/adminCondominio/tables/CuotaTable";
import CuentaTable from "../components/admin/tables/CuentaTable";

const AppRoutes = () =>
    <BrowserRouter>
        <Switch>
            <Route path="/:condominio">
                <AdminCondominioDashboard>
                    <Route path="/:condominio/anuncios" component={AnunciosTable} />
                    <Route path="/:condominio/unidades" component={UnidadTable} />
                    <Route path="/:condominio/finanzas" component={FinanzasTable} />
                    <Route path="/:condominio/eventos" component={EventosTable} />
                    <Route path="/:condominio/visitas" component={VisitasTable} />
                    <Route path="/:condominio/areas" component={AreaTable} />
                    <Route path="/:condominio/usuarios" component={UsuarioTable} />
                    <Route path="/:condominio/cuotas" component={CuotaTable} />
                    <Route path="/:condominio/cuentas" component={CuentaTable} />
                </AdminCondominioDashboard >
            </Route>


            <Route path="/admin/index" component={AdminDashboard}/>
            <Route path="/admin/anuncios" component={Anuncios}/>
            <Route path="/admin/eventos" component={Eventos}/>
            <Route path="/admin/finanzas" component={Finanzas}/>
            <Route path="/admin/areas" component={Area}/>
            <Route path="/admin/categorias" component={Categoria}/>
            <Route path="/admin/condominios" component={Condominio}/>
            <Route path="/admin/cuentas" component={Cuenta}/>
            <Route path="/admin/cuotas" component={Cuota}/>
            <Route path="/admin/unidades" component={Unidad}/>
            <Route path="/admin/personas" component={Persona}/>
            <Route path="/admin/vehiculos" component={Vehiculo}/>
            <Route path="/admin/visitantes" component={Visitante}/>
            <Route path="/condominio/:idCondominio" component={Condominio}/>
            <Route path="/" component={Login}/>
        </Switch>
    </BrowserRouter>;

export default AppRoutes;