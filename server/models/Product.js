const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product must have a name."],
    maxLength: [100, "Product name can't have more then 100 characters."]
  },
  description: {
    type: String,
    required: false
  },
  imagePath: {
    type: String,
    required: false,
    maxLength: [256, "Product's image path can't have more then 256 characters."]
  },
  price: {
    type: Number,
    required: [true, "Product must have a price."]
  }
});

const ProductModel = new mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
