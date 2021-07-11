const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user');
const productsController = require('../controllers/products');

const isAuth = passport.authenticate('jwt', {session: false});
const isAdmin = (req, res, next) => {
  if (!req.user.admin)
    res.status(401).json({status: "You need to be an administrator!"});
  else next();
}

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/products', productsController.index);
router.get('/products/:id', productsController.show);

router.post('/products', isAuth, isAdmin, productsController.store);
router.patch('/products/:id', isAuth, isAdmin, productsController.update);
router.delete('/products/:id', isAuth, isAdmin, productsController.destroy);

module.exports = router;
