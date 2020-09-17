import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBell,
  faCalendarWeek,
  faCoins,
  faFileInvoiceDollar,
  faMoneyCheckAlt,
  faTree,
  faDoorOpen,
  faUser,
  faCogs,
  faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavLink, Nav } from 'reactstrap';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import './styles.scss';

const Sidebar = props => (
    <div className={classNames('sidebar', {'is-open': props.isOpen})}>
      <div className="sidebar-header">
        <span color="info" onClick={props.toggle} style={{color: '#fff'}}>&times;</span>
        <h3>CondoSpace</h3>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <NavItem>
            <NavLink tag={Link} to={`/${props.condominio}/dashboard`}>
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2"/>Dashboard
            </NavLink>
          </NavItem>
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
         </Nav>
      </div>
    </div>
  );

export default Sidebar;
