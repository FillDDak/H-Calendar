var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var { Sequelize } = require('sequelize');
var sequelize = new Sequelize("project", "root", "!Aa5520634", {
  host: "localhost",
  dialect: "mysql"
});
global.sequelize = sequelize;
require("./model")(Sequelize, sequelize);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '!Aa5520634',
  database: 'project'
};
const sessionStore = new MySQLStore(options);
app.use(session({
  key: 'session_id',
  secret: 'board!@#sdf#$%',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);

// 예시 운동 데이터
const exercises = [
  { id: 1, name: '조깅', description: '유산소 운동으로 체력 향상에 좋습니다.' },
  { id: 2, name: '푸시업', description: '근력 운동으로 상체 근육 강화에 좋습니다.' },
  { id: 3, name: '요가', description: '유연성 향상과 마음의 평화를 줍니다.' }
];

// 운동 추천 라우트
app.post('/api/exercise-recommendation', (req, res) => {
  const { fitnessLevel, fitnessGoal, preferredExercise } = req.body;

  // 간단한 추천 알고리즘 예시
  const recommendedExercises = exercises.filter(exercise => {
    if (preferredExercise === '유산소 운동' && exercise.name === '조깅') return true;
    if (preferredExercise === '근력 운동' && exercise.name === '푸시업') return true;
    if (preferredExercise === '요가' && exercise.name === '요가') return true;
    return false;
  });

  res.json({ exercises: recommendedExercises });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
