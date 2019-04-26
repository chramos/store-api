const express = require('express');

const router = express.Router();

const product = require('../controllers/ProductController');

router.get('/', (req, res, next) => {
    product.get(req.query).then((result) => {
        res.status(200).send(result);
    })
});

router.post('/', (req, res, next) => {
    if (product.store(req.body)) {
        res.status(200).send(true);
    }
})

router.delete('/:id', (req, res, next) => {
    product.destroy(req.params.id);
    res.status(200).send(true);
})

module.exports = router;