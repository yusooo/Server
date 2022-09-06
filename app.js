const session = require('express-session');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const passport = require('passport');

dotenv.config();
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const screenRouter = require('./routes/screen');
const repoRouter = require('./routes/Report');
const goalRouter = require('./routes/Goal');
const userRouter = require('./routes/User');
const challengeRouter = require('./routes/Challenge');
const howtouseRouter = require('./routes/howtouse');
const join = require('./routes/join');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
sequelize.sync({force: false})
    .then(()=>{
        console.log('DB 연결 성공');
    })
    .catch((err)=>{
        console.error(err);
    });

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

// DB랑 연동 -> 기존 user 정보가 없을 경우 회원가입 창 띄우기

app.get('/Main', screenRouter);
app.get('/Repo', repoRouter);
app.get('/Goal', goalRouter);
app.get('/Challenge', challengeRouter);
app.get('/User', userRouter);
app.get('/HTU', howtouseRouter);
app.get('/join', join);

app.use((err, req, res, next)=>{
    console.err(err);
    res.status(500).send(err.message);
});
