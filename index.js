require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
// const { sequelize } = require('./models');
const cookieParser = require('cookie-parser');
// ! 추가 중 =======================================

// ================================================

const app = express();
app.use(logger('dev'));

// ! ★ express ====================================
// https://expressjs.com/ko/
// (1) https://expressjs.com/ko/4x/api.html#express.json
app.use(express.json());
// (2) https://expressjs.com/ko/4x/api.html#express.urlencoded, https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0/45690436#45690436
// app.use(express.urlencoded({ extended: false }));
// ================================================

// ! ★ cors =======================================
// https://www.npmjs.com/package/cors
// (1) Simple Usage (Enable All CORS Requests)
// app.use(cors());
// (2) Configuring CORS
// ex1>
// app.use(
//   cors({
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   }),
// );
// ex2>
app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'https://datda.net',
      'http://localhost:3000',
      'https://localhost:3000',
    ],
    method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ! HEAD?
    credentials: true,
  }),
);
// ================================================

// ! cookie Parser ================================
// https://www.npmjs.com/package/cookie-parser
app.use(cookieParser());
// ================================================

// ! ★ sequelize sync =============================
// asdfasdf 데이터 리셋
// sequelize
//   .sync({ force: false, alter: false }) // 여기가 true 되면 지워짐
//   .then(() => console.log('DB 접속 성공'))
//   .catch((err) => console.log(err));
// ================================================

// ! routing ======================================
// (1) https://expressjs.com/ko/4x/api.html#express.router
// (2) https://expressjs.com/ko/4x/api.html#router

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const kakaoRouter = require('./routes/kakao');

const refreshTokenRouter = require('./routes/refreshToken');
const directorRouter = require('./routes/director');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/refreshtoken', refreshTokenRouter);
app.use('/director', directorRouter);
app.use('/kakao', kakaoRouter);

// cf> 첫 배포용
// app.use('/', (req, res) => {
//   res.send('welcome to datda world!! hello!!');
// });
// ================================================

app.listen(5000, () => {
  console.log('server on 5000');
});

// app.timeout = 600000;
