import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogoClick = () => {
    if (user) {
      // Redirect to user/admin home based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } else {
      // If not logged in  navigate to the homepage or login page
      navigate('/');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          Agrofix
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {user?.role === 'user' && (
              <>
                <Nav.Link as={Link} to="/user">Home</Nav.Link>
                <Nav.Link as={Link} to="/user/products">Products</Nav.Link>
                <Nav.Link as={Link} to="/user/order">Place Order</Nav.Link>
                <Nav.Link as={Link} to="/user/orders">Track Orders</Nav.Link>
              </>
            )}
            {user?.role === 'admin' && (
              <>
                <Nav.Link as={Link} to="/admin">Admin Home</Nav.Link>
                <Nav.Link as={Link} to="/admin/products">Product Manager</Nav.Link>
                <Nav.Link as={Link} to="/admin/orders">Order Manager</Nav.Link>
              </>
            )}
          </Nav>
          {user ? (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
