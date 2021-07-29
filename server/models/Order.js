const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  quantity: {
    type: Number,
    required: true
  }
}, {_id: false});

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
    required: true
  },
  items: {
    type: [ItemSchema],
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
}, {timestamps: true});

const OrderModel = new mongoose.model('Order', OrderSchema);

module.exports = OrderModel;
