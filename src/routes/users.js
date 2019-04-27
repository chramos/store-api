const express = require('express');

const auth = require('../middleware/auth');

const router = express.Router();

const users = require('../controllers/UserController');

router.get('/', (req, res, next) => {
    users.get().then((response) => {
        console.log(reponse);
        res.status(200).json(response);
    });
});


router.post('/login', (req, res, next) => {

    users.login(req.body).then((response) => {
        
        res.status(200).json(response);
    }).catch((error) => {
        res.status(error.status).json(error.message);
    });
});

router.post('/register', (req, res, next) => {
    users.register(req.body).then((response) => {
        res.status(200).json(response);
    });
})

module.exports = router;