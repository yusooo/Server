const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const {isLoggedin} = require('./LogMiddleware');
const {Post} = require('..//models')

const router = express.Router();

try{
    fs.readdirSync('NewGoal');
} catch(error) {
    console.error('NewGoal 폴더가 존재하지 않아 폴더를 새로 생성합니다.');
    fs.mkdirSync('NewGoal');
}

const Goal = multer();

// POST로 목표값을 DB에 저장
router.post('/NewGoal', Goal.none(), isLoggedin, async(req, res, next) => {
    try{
        const post= await Post.create({
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