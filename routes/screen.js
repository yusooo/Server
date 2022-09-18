const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./LogMiddleware');

const router = express.Router();

router.use((req, res, next) => {
   res.locals.user = req.user;
   res.locals.linkedCount = 0; // 연결된 기기 갯수
   res.locals.linkedList = [];
   next();
});

router.get('/profile', (req, res) => {
    res.render('profile', { title: ' User Page ' });
});

router.get('/', (req, res, next) => {
    res.sendFile(__dirname, '../front/views/main.html');
})

module.exports = router;