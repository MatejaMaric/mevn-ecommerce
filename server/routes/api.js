const express = require('express');
const router = express.Router();
const passport = require('passport');

const exampleController = require('../controllers/example');
const userController = require('../controllers/user');

router.get('/', exampleController.index);
router.get('/protected', passport.authenticate('jwt', {session: false}), exampleController.index);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
