import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <h2>Welcome, Admin {user?.name} </h2>
          <p>Manage products and orders from the admin panel.</p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
