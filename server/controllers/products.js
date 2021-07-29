const Product = require('../models/Product');

module.exports = {

  async index(req, res) {
    const posts = await Product.find({}, '_id name imagePath price');
    res.json(posts);
  },

  async show(req, res) {
    const post = await Product.findOne({_id: req.params.id}, '_id name description imagePath price');
    res.json(post);
  },

  store(req, res) {
    let newProductObj = {
      name: req.body.name,
      description: req.body.description,
      //imagePath: null,
      price: req.body.price
    };
    if (req.file)
      newProductObj.imagePath = req.file.path;

    const newProduct = new Product(newProductObj);
    newProduct.save()
      .then(() => res.json({status: "Product successfully added!"}))
      .catch(error => res.status(400).json({
        status: "Couldn't add product!",
        error
      }));
  },

  update(req, res) {
    let updatedProduct = {
      name: req.body.name,
      description: req.body.description,
      //imagePath: null,
      price: req.body.price
    };

    if (req.file)
      updatedProduct.imagePath = req.file.path;

    Product.findOneAndUpdate({_id: req.params.id}, {$set: updatedProduct}, {new: true}, (error, product) => {
      if (error)
        res.status(400).json({status: "Couldn't update product!", error});
      else
        res.json({status: "Successfully updated product!", product});
    });
  },

  destroy(req, res) {
    Product.findByIdAndRemove(req.params.id, (error, product) => {
      if (error)
        res.status(400).json({status: "Error when removing product!", error});
      else
        res.json({status: "Product successfully removed!", product})
    });
  }

};
