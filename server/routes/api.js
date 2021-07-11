const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const productsController = require('../controllers/products');

const {isAuth, isAdmin, upload} = require('../lib/middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/products', productsController.index);
router.get('/products/:id', productsController.show);

router.post('/products', isAuth, isAdmin, upload.single('image'), productsController.store);
router.patch('/products/:id', isAuth, isAdmin, upload.single('image'), productsController.update);
router.delete('/products/:id', isAuth, isAdmin, productsController.destroy);

module.exports = router;
