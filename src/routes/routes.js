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
import CuotaTableResidente from "../components/residente/tables/CuotaTable";
import ResidenteDashboard from "../components/residente/sections/ResidenteDashboard";
import EventosTableResidente from "../components/residente/tables/EventosTable";
import AnunciosTableResidente from "../components/residente/tables/AnunciosTable";

const NoMatchPage = () => {  return (    <h3>404 - Not found</h3>  );};

const AppRoutes = () => {
    return (
        <div className="app-container">
            <ReactNotification/>
            <UsuarioProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/error" component={NoMatchPage} />
                        <Route exact path="/admin/login" component={() => <AdminLogin/>}/>
                        <Route exact path="/:condominio/login" component={() => <UserLogin/>} exact/>

                        <Route exact path="/admin">
                            <AdminDashboardWithRouter>
                                <Route exact path="/admin/index" component={CondominioList}/>
                                <Route exact path="/admin/condominio/:idCondominio" component={UsuariosTable}/>
                            </AdminDashboardWithRouter>
                        </Route>
                        <DashboardContainerWithRouter>
                            <Route exact path="/:condominio/dashboard" component={AdmincondoDashboard} />
                            <Route exact path="/:condominio/agregarUnidades" component={AgregarUnidades} />
                            <Route exact path="/:condominio/areas" component={AreaTable} />
                            <Route exact path="/:condominio/anuncios" component={AnunciosTable} />
                            <Route exact path="/:condominio/bienvenida" component={Bienvenida} />
                            <Route exact path="/:condominio/cuotas" component={CuotaTable} />
                            <Route exact path="/:condominio/cuentas" component={CuentaTable} />
                            <Route exact path="/:condominio/eventos" component={EventosTable} />
                            <Route exact path="/:condominio/usuarios" component={UsuariosTable} />
                            <Route exact path="/:condominio/transacciones" component={TransaccionesTable} />
                            <Route exact path="/:condominio/unidades" component={UnidadTable} />
                            <Route exact path="/:condominio/visitas" component={VisitasTable} />
                            <Route exact path="/:condominio/perfil" component={Perfil} />


                            <Route exact path="/:condominio/residente/bienvenida" component={Bienvenida} />
                            <Route exact path="/:condominio/residente/dashboard" component={ResidenteDashboard} />
                            <Route exact path="/:condominio/residente/cuotas" component={CuotaTableResidente} />
                            <Route exact path="/:condominio/residente/eventos" component={EventosTableResidente} />
                            <Route exact path="/:condominio/residente/anuncios" component={AnunciosTableResidente} />

                            <Route exact path="/:condominio/vigilante" component={VisitasTable} />

                        </DashboardContainerWithRouter >
                    </Switch>
                </BrowserRouter>
            </UsuarioProvider>
        </div>
    );
};

export default AppRoutes;