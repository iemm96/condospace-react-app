import React from 'react';
import {render} from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import {UsuarioProvider} from "./context/usuario-context";


import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import AppRoutes from './routes/routes';


render(
        <BrowserRouter>
            <UsuarioProvider>

                <AppRoutes/>

            </UsuarioProvider>
        </BrowserRouter>
    , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
