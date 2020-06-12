import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
  faBell, faCalendarWeek, faCoins, faFileInvoiceDollar, faMoneyCheckAlt, faTree, faDoorOpen, faUser, faCogs
} from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavLink, Nav } from 'reactstrap';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

const SideBar = props => (
    <div className={classNames('sidebar', {'is-open': props.isOpen})}>
      <div className="sidebar-header">
        <span color="info" onClick={props.toggle} style={{color: '#fff'}}>&times;</span>
        <h3>CondoSpace</h3>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <NavItem>
            <NavLink tag={Link} to={`/${props.condominio}/unidades`}>
              <FontAwesomeIcon icon={faHome} className="mr-2"/>Unidades
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/${props.condominio}/anuncios`}>
              <FontAwesomeIcon icon={faBell} className="mr-2"/>Anuncios
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/${props.condominio}/transacciones`}>
              <FontAwesomeIcon icon={faMoneyCheckAlt} className="mr-2"/>Transacciones
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/${props.condominio}/cuotas`}>
              <FontAwesomeIcon icon={faCoins} className="mr-2"/>Cuotas
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/${props.condominio}/cuentas`}>
              <FontAwesomeIcon icon={faFileInvoiceDollar} className="mr-2"/>Cuentas
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/${props.condominio}/eventos`}>
              <FontAwesomeIcon icon={faCalendarWeek} className="mr-2"/>Eventos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/${props.condominio}/visitas`}>
              <FontAwesomeIcon icon={faDoorOpen} className="mr-2"/>Visitas
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/${props.condominio}/areas`}>
              <FontAwesomeIcon icon={faTree} className="mr-2"/>Áreas Comunes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/${props.condominio}/usuarios`}>
              <FontAwesomeIcon icon={faUser} className="mr-2"/>Usuarios
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/${props.condominio}/configuracion`}>
              <FontAwesomeIcon icon={faCogs} className="mr-2"/>Configuración
            </NavLink>
          </NavItem>
         </Nav>
      </div>
    </div>
  );

  const submenus = [
    [
      {
        title: "Home 1",
        target: "Home-1"
      },
      {
        title: "Home 2",
        target: "Home-2",        
      },
      {
        itle: "Home 3",
        target: "Home-3",      
      }
    ],
    [
      {
        title: "Page 1",
        target: "Page-1",          
      },
      {
        title: "Page 2",
        target: "Page-2",        
      }
    ]
  ]
  

export default SideBar;
