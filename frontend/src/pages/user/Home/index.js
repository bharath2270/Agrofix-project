import React, { useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <h2>Welcome, {user?.name} 👋</h2>
          <p>Browse products, place orders, and track deliveries on Agrofix.</p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
