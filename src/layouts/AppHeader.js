import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const AppHeader = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#operations">Oompa Loompas​'s Crew</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#users">Usuarios</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppHeader;
