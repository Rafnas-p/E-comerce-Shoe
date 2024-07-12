import React from 'react';
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './navbar.css'

function AdminNav() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home" className="text-light">
            Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example" className="justify-content-end">
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Admin"
                menuVariant="dark"
              >
                <NavDropdown.Item href="/admin">Product</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/admin/registerduser')}>
                  Users
                </NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider /> */}
                <NavDropdown.Item onClick={() => navigate("/")}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AdminNav;
