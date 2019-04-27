const express = require('express');

const router = express.Router();

router.use('/products', require('./products'));
router.use('/categories', require('./categories'));
router.use('/users', require('./users'));

module.exports = router;