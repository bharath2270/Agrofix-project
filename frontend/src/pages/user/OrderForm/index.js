import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import api from '../../../services/api';

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [buyerName, setBuyerName] = useState('');
  const [buyerContact, setBuyerContact] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();  

  useEffect(() => {
    api.get('/products').then((res) => setProducts(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = [{ productId, quantity }];
    try {
      const res = await api.post('/orders', { buyerName, buyerContact, deliveryAddress, items });
      setSuccess(`Order placed successfully! Your Order ID is: ${res.data.order._id}`);

      setBuyerName('');
      setBuyerContact('');
      setDeliveryAddress('');
      setProductId('');
      setQuantity('');
       
      
      
    } catch (err) {
      setSuccess('Failed to place order.');
    }
  };

  return (
    <Container className="mt-4">
      <h3>Place Bulk Order</h3>
      {success && <Alert>{success}</Alert>}
      <Form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
       
        <Form.Group className="mb-3">
          <Form.Label>Buyer Name</Form.Label>
          <Form.Control
            type="text"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            required
          />
        </Form.Group>

       
        <Form.Group className="mb-3">
          <Form.Label>Buyer Contact (Phone)</Form.Label>
          <Form.Control
            type="tel"
            value={buyerContact}
            onChange={(e) => setBuyerContact(e.target.value)}
            required
          />
        </Form.Group>

      
        <Form.Group className="mb-3">
          <Form.Label>Delivery Address</Form.Label>
          <Form.Control
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            required
          />
        </Form.Group>

   
        <Form.Group className="mb-3">
          <Form.Label>Product</Form.Label>
          <Form.Select value={productId} onChange={(e) => setProductId(e.target.value)} required>
            <option value="">Select a product</option>
            {products.map((p) => (
              <option value={p._id} key={p._id}>
                {p.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

    
        <Form.Group className="mb-3">
          <Form.Label>Quantity (kg)</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Place Order
        </Button>
      </Form>
    </Container>
  );
};

export default OrderForm;
