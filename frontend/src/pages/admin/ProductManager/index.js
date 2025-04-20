import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import api from '../../../services/api';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', category: '' });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

 
  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleShow = (product = null) => {
    if (product) {
      setForm({ name: product.name, price: product.price, category: product.category });
      setEditingId(product._id);
    } else {
      setForm({ name: '', price: '', category: '' });
      setEditingId(null);
    }
    setImage(null); // reset image
    setShowModal(true);
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Submit add/edit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('price', form.price);
      formData.append('category', form.category);
      if (image) formData.append('image', image);

      if (editingId) {
        await api.patch(`/products/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Manage Products</h3>
      <Button className="mb-3" onClick={() => handleShow()}>
        Add Product
      </Button>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th><th>Price</th><th>Category</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.category}</td>
              <td>
                <Button size="sm" variant="info" onClick={() => handleShow(p)}>Edit</Button>{' '}
                <Button size="sm" variant="danger" onClick={() => handleDelete(p._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit' : 'Add'} Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">{editingId ? 'Update' : 'Add'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ProductManager;
