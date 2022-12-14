const { user } = require('../models/user');
const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const mysql = require('mysql');
const { query, response } = require('express');
const Weight = require('../models/Weight');
const dbconfig = require('../config/config.json');
const connection = mysql.createConnection(dbconfig);

const axios = require('axios');

// function today(){
//     const wkday = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');
//     let whatoday = new Date().getDay();
//     let todaylabel = wkday[whatoday];
//     return todaylabel;
// }
// function thisweek(){
//     const wkordinal = new Array('First', 'Second', 'Third', 'Fourth', 'Fifth');
//     let whatweek = new Date().getWeek();
//     let thiswk = wkordinal[whatweek];
//     return thiswk;
// }

// http://localhost:3000/report -> GET 요청 보내면
// 필요한거: 이 요청을 보낸 사용자가 누구인지 확인하는 기능이 필요함 (책 10장 10.3 참고)
router.get('/today', async (req, res, next) => {
    const { user_id } = require( '../models/user' ); // 일단 임시로 설정해놓은 유저 아이디 => 유저 아이디 가지고 와야 댐

    axios.get(`user?id=${user_id}`)
    .then(function(res){
        const DPlastic = Weight.findAll({
            where: {Weight_type:"DPlastic"},
        });
        const DPaper = Weight.findAll({
            where: {Weight_type:"DPaper"},
        });
        const DCan = Weight.findAll({
            where: {Weight_type:"DCan"},
        });
    })
    .catch(function(error){
        console.error(error);
    });
    
    res.json({DPlastic:DPlastic, DPaper:DPaper, DCan:DCan});
})
router.get('/yesterday', async (req, res, next) => {
    const { user_id } = require( '../models/user' ); // 일단 임시로 설정해놓은 유저 아이디 => 유저 아이디 가지고 와야 댐

    async()=>{
        axios
            .get(`user?id=${user_id}`)
            .then(function(response){
                const YDPlastic = Weight.findAll({
                    where: {Weight_type:"YDPlastic"},
                });
                const YDPaper = Weight.findAll({
                    where: {Weight_type:"YDPaper"},
                });
                const YDCan = Weight.findAll({
                    where: {Weight_type:"YDCan"},
                });
            })
            .catch(function(error){
                console.error(error);
            });
    }
    res.json({YDPlastic:YDPlastic, YDPaper:YDPaper, YDCan:YDCan});
})


module.exports = router;