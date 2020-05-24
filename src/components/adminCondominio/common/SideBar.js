import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faPaperPlane, faQuestion, faImage, faCopy } from '@fortawesome/free-solid-svg-icons';
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
          <p>Menú</p>
          <NavItem>
            <NavLink tag={Link} to={'/admin/condominios'}>
              <FontAwesomeIcon icon={faBriefcase} className="mr-2"/>Condominio
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/admin/anuncios'}>
              <FontAwesomeIcon icon={faBriefcase} className="mr-2"/>Anuncios
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/admin/visitantes'}>
              <FontAwesomeIcon icon={faBriefcase} className="mr-2"/>Visitas
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/admin/cuentas'}>
              <FontAwesomeIcon icon={faImage} className="mr-2"/>Cuentas
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/admin/cuotas'}>
              <FontAwesomeIcon icon={faQuestion} className="mr-2"/>Cuotas
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/admin/areas'}>
              <FontAwesomeIcon icon={faQuestion} className="mr-2"/>Areas
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/admin/categorias'}>
              <FontAwesomeIcon icon={faQuestion} className="mr-2"/>Categoria
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/admin/eventos'}>
              <FontAwesomeIcon icon={faQuestion} className="mr-2"/>Eventos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/admin/finanzas'}>
              <FontAwesomeIcon icon={faQuestion} className="mr-2"/>Finanzas
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/admin/unidades'}>
              <FontAwesomeIcon icon={faQuestion} className="mr-2"/>Unidad
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/admin/personas'}>
              <FontAwesomeIcon icon={faQuestion} className="mr-2"/>Persona
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/admin/vehiculos'}>
              <FontAwesomeIcon icon={faQuestion} className="mr-2"/>Vehiculo
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
