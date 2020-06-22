import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminLogin from "../components/admin/AdminLogin";
import {AdminDashboardWithRouter} from "../components/admin/AdminDashboard";
import {DashboardContainerWithRouter} from "../components/adminCondominio/UserDashboard";

import AnunciosTable from "./../components/adminCondominio/tables/AnunciosTable";
import UnidadTable from "../components/adminCondominio/tables/UnidadTable";
import EventosTable from "../components/adminCondominio/tables/EventosTable";
import VisitasTable from "../components/adminCondominio/tables/VisitasTable";
import CuotaTable from "../components/adminCondominio/tables/CuotaTable";
import CuentaTable from "../components/adminCondominio/tables/CuentaTable";
import TransaccionesTable from "../components/adminCondominio/tables/TransaccionesTable";

import {CondominioList} from "../components/adminCondominio/lists/CondominioList";
import UsuariosTable from "../components/adminCondominio/tables/UsuariosTable";
import UserLogin from "../UserLogin";
import Bienvenida from "../components/adminCondominio/sections/Bienvenida";
import {AgregarUnidades} from "../components/adminCondominio/sections/AgregarUnidades";
import {UsuarioProvider} from "../context/usuario-context";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import AreaTable from "../components/adminCondominio/tables/AreaTable";
import AdmincondoDashboard from "../components/adminCondominio/sections/AdmincondoDashboard";
import {Perfil} from "../components/adminCondominio/sections/Perfil";

const NoMatchPage = () => {  return (    <h3>404 - Not found</h3>  );};

const AppRoutes = () => {

    return (
        <div className="app-container">
            <ReactNotification/>
            <UsuarioProvider>
                <BrowserRouter>
                    <Switch>
                        <Route path="/error" component={NoMatchPage} />
                        <Route path="/admin/login" component={() => <AdminLogin/>}/>
                        <Route path="/:condominio/login" component={() => <UserLogin/>} exact/>

                        <Route path="/admin">
                            <AdminDashboardWithRouter>
                                <Route path="/admin/index" component={CondominioList}/>
                                <Route path="/admin/condominio/:idCondominio" component={UsuariosTable}/>
                            </AdminDashboardWithRouter>
                        </Route>
                        <Route path="/:condominio">
                            <DashboardContainerWithRouter>
                                <Route path="/:condominio/dashboard" component={AdmincondoDashboard} />
                                <Route path="/:condominio/agregarUnidades" component={AgregarUnidades} />
                                <Route path="/:condominio/areas" component={AreaTable} />
                                <Route path="/:condominio/anuncios" component={AnunciosTable} />
                                <Route path="/:condominio/bienvenida" component={Bienvenida} />
                                <Route path="/:condominio/cuotas" component={CuotaTable} />
                                <Route path="/:condominio/cuentas" component={CuentaTable} />
                                <Route path="/:condominio/eventos" component={EventosTable} />
                                <Route path="/:condominio/usuarios" component={UsuariosTable} />
                                <Route path="/:condominio/transacciones" component={TransaccionesTable} />
                                <Route path="/:condominio/unidades" component={UnidadTable} />
                                <Route path="/:condominio/visitas" component={VisitasTable} />
                                <Route path="/:condominio/perfil" component={Perfil} />


                                <Route path="/:condominio/residentes" component={UnidadTable} />
                                <Route path="/:condominio/vigilante" component={VisitasTable} />

                            </DashboardContainerWithRouter >
                        </Route>
                    </Switch>
                </BrowserRouter>
            </UsuarioProvider>
        </div>
    );
};

export default AppRoutes;