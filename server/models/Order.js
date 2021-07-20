const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  paypalOrderId: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  items: {
    type: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    required: true
  },
  shipping: {
    name: {
      full_name: String
    },
    type: {
      type: String
    },
    address: {
      address_line_1: String,
      address_line_2: String,
      admin_area_1: String,
      admin_area_2: String,
      postal_code: String,
      country_code: String
    },
    required: false
  }
});

const OrderModel = new mongoose.model('Order', OrderSchema);

module.exports = OrderModel;
