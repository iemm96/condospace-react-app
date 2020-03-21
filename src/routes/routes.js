import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "../Login";
import AdminDashboard from "../components/admin";
import AreasComunes from "../admin/AreasComunes";

i
import Anuncios from "../components/admin/sections/Anuncios";
import Eventos from "../components/admin/sections/Eventos";
import Finanzas from "../components/admin/sections/Finanzas";
const AppRoutes = () =>
    <BrowserRouter>
        <Switch>
            <Route path="/admin/index" component={AdminDashboard}/>
            <Route path="/admin/anuncios" component={Anuncios}/>
            <Route path="/admin/eventos" component={Eventos}/>
            <Route path="/admin/finanzas" component={Finanzas}/>
            <Route path="/admin/areasComunes" component={AreasComunes}/>
            <Route path="/" component={Login}/>
        </Switch>
    </BrowserRouter>;

export default AppRoutes;