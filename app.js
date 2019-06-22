var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const index = require('./routes/home');
const { Doctor, Visit, Pantient, Schedule } = require('./routes');
const { generateDoctor, generatePantient, generateSchedule, generateVisit } = require('./faker');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

//doctor
app.use('/doctors', Doctor.getAll);
app.use('/doctor', Doctor.get);
app.use('/remove', Doctor.remove);

//visit
app.use('/visits', Visit.getAll);
app.use('/visit', Visit.get);
app.use('/visit/remove', Visit.remove);

//schedule
app.use('/schedules', Schedule.getAll);
app.use('/schedule', Schedule.get);
app.use('/schedule/remove', Schedule.remove);

//pantients
app.use('/pantients', Pantient.getAll);
app.use('/pantient', Pantient.get);
app.use('/pantient/remove', Pantient.remove);

//faker
app.use('/generatePantient', generatePantient);
app.use('/generateDoctor', generateDoctor);
app.use('/generateVisit', generateVisit);
app.use('/generateSchedule', generateSchedule);

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
