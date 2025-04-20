const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Product = require('../Models/Product.model');
const Order = require('../Models/Order.model');



router.post('/', async (req, res) => {
  const { buyerName, buyerContact, deliveryAddress, items } = req.body;

  try {

    const productIds = items.map(item => new mongoose.Types.ObjectId(item.productId));  // 
   
    const products = await Product.find({ '_id': { $in: productIds } });

    if (products.length !== items.length) {
      return res.status(400).json({ message: 'One or more products are invalid' });
    }

   
    const order = new Order({
      buyerName,
      buyerContact,
      deliveryAddress,
      items: items.map(item => ({
        productId: new mongoose.Types.ObjectId(item.productId), 
        quantity: item.quantity
      }))
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});
router.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  
  console.log(orderId)
  try {
   
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = await Order.findById(orderId).populate('items.productId', 'name price');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

  router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }
  
    
    const validStatuses = ['Pending', 'In Progress', 'Delivered'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Valid statuses are: Pending, In Progress, Delivered.' });
    }
  
    try {
     
      if (status) {
        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
  
        if (!updatedOrder) {
          return res.status(404).json({ message: 'Order not found' });
        }
  
        return res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
      }
  
      
      const order = await Order.findById(id).populate('items.productId', 'name price');
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({ message: 'Order fetched successfully', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing the request', error: error.message });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const orders = await Order.find()
        .populate('items.productId', 'name price')  
        .exec();
  
      res.status(200).json({
        message: 'Orders fetched successfully',
        orders
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  });
  



module.exports = router;
