import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "../Login";
import AdminIndex from "../admin/AdminIndex";

const AppRoutes = () =>
    <BrowserRouter>
        <Switch>
            <Route path="/admin/anuncios" component={AdminIndex}/>
            <Route path="/admin/finanzas" component={AdminIndex}/>
            <Route path="/" component={Login}/>
        </Switch>
    </BrowserRouter>;

export default AppRoutes;