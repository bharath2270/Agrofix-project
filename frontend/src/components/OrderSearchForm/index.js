import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSearchForm = () => {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      navigate(`/user/orders/${orderId}`); 
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Track Your Order</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter your Order ID"
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit">Track</button>
      </form>
    </div>
  );
};

export default OrderSearchForm;
