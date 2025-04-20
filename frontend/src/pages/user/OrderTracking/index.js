import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const res = await fetch(`http://localhost:8000/orders/${orderId}`);
      if (!res.ok) throw new Error('Order not found');

      const data = await res.json();
      setOrder(data.order || data); // depending on your API response shape
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Track Your Order</h3>

      <Form onSubmit={handleTrackOrder} style={{ maxWidth: '500px' }}>
        <Form.Group className="mb-3">
          <Form.Label>Order ID</Form.Label>
          <Form.Control
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            placeholder="Enter Order ID"
          />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Track Order'}
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {order && (
        <div className="mt-4">
          <h4>Order Details</h4>
          <p><strong>Buyer:</strong> {order.buyerName}</p>
          <p><strong>Contact:</strong> {order.buyerContact}</p>
          <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
          <p><strong>Status:</strong> {order.status}</p>

          <h5 className="mt-3">Items</h5>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.productId?.name || 'Unknown Product'} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default OrderTracking;
