const session = require('express-session');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 1989);

module.exports = function(app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: `http://localhost:1989`,
            changeOrigin: true,
        })
    )
}

axios({
    url: 'http://112.185.248.156:1989/front/views',
    method: 'get',
})

dotenv.config();
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const v01_00_00 = require('./routes/v01_00_00');
const screenRouter = require('./routes/screen');
const repoRouter = require('./routes/Report');
const goalRouter = require('./routes/Goal');
const userRouter = require('./routes/User');
const challengeRouter = require('./routes/Challenge');
const howtouseRouter = require('./routes/howtouse');
const join = require('./routes/join');

app.use(cors({origin: `http://localhost:/1989`}));
passportConfig();
app.set('views', __dirname + './front/views');
app.set('view engine', 'ejs');
sequelize.sync({force: false})
    .then(()=>{
        console.log('DB 연결 성공');
    })
    .catch((err)=>{
        console.error(err);
    });


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly : true,
        secure: true,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/ver01', v01_00_00);
app.use('/', screenRouter);
app.use('/auth', join);

app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 존재하지 않습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.render('error');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '빈 포트에서 대기 중');
});

app.use(express.static('front'));

// DB랑 연동 -> 기존 user 정보가 없을 경우 회원가입 창 띄우기

app.use('/Main', screenRouter);
app.use('/Repo', repoRouter);
app.use('/Goal', goalRouter);
app.use('/Challenge', challengeRouter);
app.use('/User', userRouter);
app.use('/HTU', howtouseRouter);
app.use('/join', join);

app.use((err, req, res, next)=>{
    console.err(err);
    res.status(500).send(err.message);
});
