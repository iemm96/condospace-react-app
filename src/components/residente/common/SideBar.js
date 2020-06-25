import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCalendarWeek,
  faCoins,
  faTachometerAlt
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
            <NavLink tag={Link} to={`/${props.condominio}/residente/dashboard`}>
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2"/>Dashboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/${props.condominio}/residente/anuncios`}>
              <FontAwesomeIcon icon={faBell} className="mr-2"/>Anuncios
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/${props.condominio}/residente/cuotas`}>
              <FontAwesomeIcon icon={faCoins} className="mr-2"/>Cuotas
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/${props.condominio}/residente/eventos`}>
              <FontAwesomeIcon icon={faCalendarWeek} className="mr-2"/>Eventos
            </NavLink>
          </NavItem>
         </Nav>
      </div>
    </div>
  );

export default SideBar;
