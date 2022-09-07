const express = require('express');
const path = require('path');
const fs = require('fs');
const multer= require('multer');

const {isLoggedIn} = require('./LogMiddleware');
const Goal = require('../models/Goal')

const router = express.Router();

try{
    fs.readdirSync('NewGoal');
} catch(error) {
    console.error('NewGoal 폴더가 존재하지 않아 폴더를 새로 생성합니다.');
    fs.mkdirSync('NewGoal');
}

// multer 설정 필요 - 완료
const Goalp = multer();

// POST로 목표값을 DB에 저장
router.post('/NewGoal', isLoggedIn, async (req, res, next) => {
    try{
        const post = await Goal.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        res.redirect('/Goal');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;