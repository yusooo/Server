const { user } = require('../models/user');
const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const mysql = require('mysql');
const { query, response } = require('express');
const Weekly = require('../models/Weekly');
const Daily = require('../models/Daily');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Sordes',
})
db.connect();

function today(){
    const wkday = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');
    let whatoday = new Date().getDay();
    let todaylabel = wkday[whatoday];
    return todaylabel;
}
function thisweek(){
    const wkordinal = new Array('First', 'Second', 'Third', 'Fourth', 'Fifth');
    let whatweek = new Date().getWeek();
    let thiswk = wkordinal[whatweek];
    return thiswk;
}

router.get('/', (req, res, next)=>{
    try{    
        db.query(`SELECT Weight_${today()} FROM Daily WHERE id=?`, [queryData.id], function(error, dailydata){
            let dailylist = template.list(dailydata);
        });
        db.query(`SELECT Week_${thisweek()} FROM Weekly WHERE id=?`, [queryData.id], function(error, weeklydata){
            let weeklylist = template.list(weeklydata); 
        });
        res.writeHead(200);
    } catch(error){
        console.error(error);
    }
})

db.end();
module.exports = router;