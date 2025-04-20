import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import api from '../../../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products').then((res) => {
      console.log(res.data);
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Container className="mt-4">
      <h3>Available Products</h3>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row className="mt-3">
          {products.map((p) => (
            <Col md={4} key={p._id} className="mb-3">
              <Card>
                {p.image && (
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/uploads/${p.image}`}
                    alt={p.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>Price: ₹{p.price} / kg</Card.Text>
                  <Card.Text>Category: {p.category}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ProductList;
