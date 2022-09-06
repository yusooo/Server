const express = require('express');
const router = express.Router();
const {user} = require('../models/user');

router.get('/', (req, res, next) => {
    res.sendFile(__dirname + '../views/');
})

module.exports = router;