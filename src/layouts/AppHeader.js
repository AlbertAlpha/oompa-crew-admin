import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import logo from '../resources/images/logo-umpa-loompa.png';

const AppHeader = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <NavLink to="/users" className="text-reset">
        <img src={logo} alt="logo-img" className="brand-logo mr-2" />
        <span className="brand-name">Oompa Loompas​'s Admin</span>
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item><Link to="/users">Users</Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppHeader;
