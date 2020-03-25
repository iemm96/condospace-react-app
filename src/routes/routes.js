import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "../Login";
import AdminDashboard from "../components/admin";
import AreasComunes from "../components/admin/sections/AreasComunes";
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
import Usuario from "../components/admin/sections/Usuario";
import Areas from "../components/admin/sections/AreasComunes";
import Condominios from "../components/admin/sections/Condominio";
import Usuarios from "../components/admin/sections/Usuario";

const AppRoutes = () =>
    <BrowserRouter>
        <Switch>
            <Route path="/admin/index" component={AdminDashboard}/>
            <Route path="/admin/anuncios" component={Anuncios}/>
            <Route path="/admin/eventos" component={Eventos}/>
            <Route path="/admin/finanzas" component={Finanzas}/>
            <Route path="/admin/areasComunes" component={AreasComunes}/>
<<<<<<< HEAD
            <Route path="/admin/Categoria" component={Categoria}/>
            <Route path="/admin/Condominio" component={Condominio}/>
            <Route path="/admin/Cuenta" component={Cuenta}/>
            <Route path="/admin/Cuota" component={Cuota}/>
            <Route path="/admin/Unidad" component={Unidad}/>
            <Route path="/admin/Usuario" component={Usuario}/>
            <Route path="/admin/Vehiculo" component={Vehiculo}/>
            <Route path="/admin/Visitante" component={Visitante}/>
            <Route path="/admin/areas" component={Areas}/>
            <Route path="/admin/condominios" component={Condominios}/>
            <Route path="/admin/usuarios" component={Usuarios}/>
=======
            <Route path="/admin/categorias" component={Categoria}/>
            <Route path="/admin/condominios" component={Condominio}/>
            <Route path="/admin/cuentas" component={Cuenta}/>
            <Route path="/admin/cuotas" component={Cuota}/>
            <Route path="/admin/unidades" component={Unidad}/>
            <Route path="/admin/usuarios" component={Usuario}/>
            <Route path="/admin/vehiculos" component={Vehiculo}/>
            <Route path="/admin/visitantes" component={Visitante}/>
>>>>>>> ui-update
            <Route path="/" component={Login}/>
        </Switch>
    </BrowserRouter>;

export default AppRoutes;