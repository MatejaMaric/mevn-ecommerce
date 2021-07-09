const express = require('express');
const router = express.Router();

const exampleController = require('../controllers/example');

router.get('/', exampleController.index);

module.exports = router;
