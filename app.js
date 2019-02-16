var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/main', (req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.get('/startups', function(req, res) {
	var more_info = {
		author_img: 'people.svg', 
		author_name: 'Вася Вася',
		need_people: [
			{
				position: 'программист JS',
				isFound: true
			},
			{
				position: 'Маркетолог',
				isFound: false
			},
			{
				position: 'Дизайнер',
				isFound: true
			}
		]
	};
	var startups = [
		{title: 'Площадка для ddddстартапов', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 3, more_info: more_info},
		{title: 'Площадка для стартапов', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 4, more_info: more_info},
		{title: 'Площадка для стартапов', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 5, more_info: more_info},
		{title: 'Площадка для стартапов', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 6, more_info: more_info},
		{title: 'Площадка для стартапов', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 7, more_info: more_info},
		{title: 'Площадка для стартаdwadwв', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 8, more_info: more_info}
	];
   res.json(startups);
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
