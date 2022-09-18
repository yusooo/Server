const express = require('express');
const router = express.Router();
const {user} = require('../models/user');

router.get('/', (req, res, next) => {
    res.sendFile(__dirname + '../front/views/use.html');
})

module.exports = router;