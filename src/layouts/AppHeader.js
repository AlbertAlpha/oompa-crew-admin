import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import logo from '../resources/images/logo-umpa-loompa.png';

const AppHeader = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#users">
        <img src={logo} alt="logo-img" className="brand-logo mr-2" />
        <span className="brand-name">Oompa Loompas​'s Admin</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#users">Users</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppHeader;
