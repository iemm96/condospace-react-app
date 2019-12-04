import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "../Login";
import AdminDashboard from "../components/admin";
import Anuncios from "../admin/Anuncios";
import Finanzas from "../admin/Finanzas";
import Eventos from "../admin/Eventos";
import AreasComunes from "../admin/AreasComunes";

const AppRoutes = () =>
    <BrowserRouter>
        <Switch>
            <Route path="/admin/index" component={AdminDashboard}/>
            <Route path="/admin/finanzas" component={Finanzas}/>
            <Route path="/admin/eventos" component={Eventos}/>
            <Route path="/admin/areasComunes" component={AreasComunes}/>
            <Route path="/" component={Login}/>
        </Switch>
    </BrowserRouter>;

export default AppRoutes;