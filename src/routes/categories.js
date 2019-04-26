const express = require('express');

const router = express.Router();

const category = require('../controllers/CategoryController');

router.get('/', (req, res, next) => {
    category.get().then((result) => {
        res.status(200).send(result);
    })
});

router.post('/', (req, res, next) => {
    if (category.store(req.body)) {
        res.status(200).send(true);
    }
})

module.exports = router;