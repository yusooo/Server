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
        // connection.query('SELECT * from Weight where Weight_type='D*', (error,rows) => {

        // })
        Weight.findAll({
            where: {Weight_type:"D*"},
        })
        console.log(res);
    })
    .catch(function(error){
        console.error(error);
    });
        

    res.send(result);
    //  try{    
    //     db.query(`SELECT Weight_${today()} FROM Daily WHERE id=?`, [queryData.id], function(error, dailydata){
    //         let dailylist = template.list(dailydata);
    //     });
    //     db.query(`SELECT Week_${thisweek()} FROM Weekly WHERE id=?`, [queryData.id], function(error, weeklydata){
    //         let weeklylist = template.list(weeklydata); 
    //     });
    //     res.writeHead(200);
    // } catch(error){
    //     console.error(error);
    // }
})

module.exports = router;