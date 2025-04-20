import React, { useEffect, useState } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import api from '../../../services/api';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      console.log("Fetched Orders:", res.data.orders);  
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/orders/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status', error);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Manage Orders</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Buyer</th>
            <th>Product</th>
            <th>Qty (kg)</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) =>
              order.items.map((item, idx) => (
                <tr key={`${order._id}-${idx}`}>
                  <td>{order.buyerName}</td>
                  <td>{item.productId?.name || 'Unknown Product'}</td>
                  <td>{item.quantity}</td>
                  <td>{order.status}</td>
                  <td>
                    <Form.Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Delivered">Delivered</option>
                    </Form.Select>
                  </td>
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No orders available.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderManager;
