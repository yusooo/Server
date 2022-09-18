const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('./LogMiddleware');
const { Domain, User } = require('../models');

const router = express.Router();

router.post('/token', async(req, res)=>{
    const { clientSecret }= req.body;
    try{
        const domain = await Domain.findOne({
            where: {clientSecret},
            include: {
                model: User,
                attribute: ['nick', 'id'],
            },
        });
        if(!domain){
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 사용자입니다. 먼저 사용자 등록을 해주세요.',
            });
        }
        const token = jwt.sign({
            id: domain.User.id,
            nick: domain.User.nick,
        }, process.env.JWT_SECRET, {
            expiresInn: '30m',
            issure: 'Sordes',
        });
        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다.',
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러',
        });
    }
});

router.get('/forTest', verifyToken, (req, res) => {
    res.json(req.decoded);
});

module.exports = router;