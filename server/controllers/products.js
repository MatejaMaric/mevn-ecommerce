module.exports = {

  index(req, res) {
    res.json({products: "index"});
  },

  show(req, res) {
    res.json({products: "show"});
  },

  store(req, res) {
    res.json({products: "store"});
  },

  update(req, res) {
    res.json({products: "update"});
  },

  destroy(req, res) {
    res.json({products: "destroy"});
  },

};
