import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrackOrderForm = () => {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/user/orders/${orderId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button type="submit">Track</button>
    </form>
  );
};

export default TrackOrderForm;
