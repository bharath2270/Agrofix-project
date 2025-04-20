const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyerName: String,
  buyerContact: String,
  deliveryAddress: String,
  status: {
    type: String,
    default: 'Pending'
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
      },
      quantity: Number
    }
  ]
});

module.exports = mongoose.model('Order', orderSchema);
