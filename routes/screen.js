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
    // main 페이지 로딩 (피그마 참고)
    
})

module.exports = router;