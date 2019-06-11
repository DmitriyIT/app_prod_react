var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

const fileUpload = require('express-fileupload');
app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'build')));


app.post('/checkEmail', function(req, res) {
	console.log(req.body);
	var ans = (req.body.email === "awd");
	res.json({ ans: ans });
});


app.post('/login', function(req, res) {
	console.log(req.body);
	var response;
	if (req.body.email == 'awd') {
		response = {
			code: 21,
			userData:{
				name:"strawd",
				surName:"str",
				photo:"../../img/icon/vasia.jpg",
				description:"",
				notifications:[],
				myStartupId: 12
			}
		}
	} else {
		response = false;
	}
	res.json(response);
});

app.get('/logout', function(req, res) {
	console.log('logout enter');
	res.json({awd: 21});
});

app.get('/isAuth/:idStartup', function(req, res) {
	console.log(req.params.idStartup);
	// return { 
	//  isAuth: true,
	//  admin: true
	// }
	res.json({
		isAuth: false,
		admin: false
	});
});

app.post('/reg', function(req, res) {
	console.log(req.body);
	var response;
	if (req.body.email == 'awd') {
		response = {
			code: 21,
			userData:{
				name:"strawd",
				surName:"str",
				photo:"../../img/icon/vasia.jpg",
				description:"",
				notifications:[],
				myStartupId: 12
			}
		}
	} else {
		response = false;
	}
	res.json(response);
});


app.get('/getInfoProfile', function(req, res) {
	var data = {
		isAuth: true,
		user_info: {
			img_src: '../../img/icon/vasia.jpg',
			email: 'email@yandex.ru',
			fname: 'Вася',
			sname: 'Васькин',
			aboute: 'что то о себе'
		}
	}
   res.json(data);
});

app.get('/getNotifications', function(req, res) {
	var notifications = [
		'Вас приняли в стартап (27.01.18)',
		'За сегодня в чате старпата есть сообщения (27.01.18)'
	];
	// or notifications = undefined || null;
   res.json({
   	notifications: notifications
   });
});

app.post('/changeUserData', function(req, res) {
	console.log(req.body);
	// var sampleFile = req.files.userImg;
	// Needed premissions (run sudo or mb premissions on directory)
	res.json({ans: 'yes'});
});
app.post('/sendUserImg', function(req, res) {
	console.log(req.files.userImg);
	var sampleFile = req.files.userImg;
	// Needed premissions (run sudo or mb premissions on directory)
	sampleFile.mv('./userImg.jpg', function(err) {
	   if (err) return res.status(500).send(err);

	   res.json({awd: 'uploaded'});
   });
});

app.post('/createstartup', function(req, res) {
	console.log(req.body);
	res.json({ code: 21 });
});

app.get('/getInfoOfStartup', function(req, res) {
	var fields = [
		{name: 'theme',        value: 'Площадка для стартапов'},
		{name: 'description',  value: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их. И еще текст тест'},
		{name: 'shortDescr',   value: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их'},
		{name: 'peopleNeeded', value: 'программист JS Маркетолог Дизайнер'},
		{name: 'contacts',     value: 'some mail'}
	];
   res.json(fields);
});
app.get('/getInfoOfStartup/:id', function(req, res) {
	console.log(req.params.id);
	var fields = {
		'theme'        : 'Площадка для стартапов',
		'description'  : 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их. И еще текст тест',
		'shortDescr'   : 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их',
		'peopleNeeded' : [
			{
				possition: 'программист JS', //position написан с ошибкой possition
				isFound: true
			},
			{
				possition: 'Дизайнер',
				isFound: false
			},
			{
				possition: 'программист еще 1',
				isFound: false
			}
		],
		'contacts'     : 'some mail'
	}
   res.json(fields);
});


app.post('/sendInvite', function(req, res) {
	console.log(req.body.idStartup);
	console.log(req.body.possition);
	res.json({ ans: true });
});

app.get('/mystartup', function(req, res) {
	var mystartup = {
		role: "master", //master||member||no
		startup:{
			id: 32,
			title: 'Площадка для стартапов',
			description: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их. И еще текст тест',
			messages:[],
			members:[],
			startup_requests:[] //if role == master
		}
	};
   res.json(mystartup);
});

var more_info = {
	author_img: '../../img/icon/people.svg', 
	author_name: 'Вася Вася',
	need_people: [
		{
			possition: 'программист JS',
			isFound: true
		},
		{
			possition: 'Маркетолог',
			isFound: false
		},
		{
			possition: 'Дизайнер',
			isFound: true
		}
	]
};
var startups = [
	{title: 'Площадка для ddddстартапов', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 3, more_info: more_info},
	{title: 'Площадка для стартапов', body: 'Создать сайт, где люди смогут х.', id: 4, more_info: more_info},
	{title: 'Площадка для стартапов', body: 'Создать сайт, где люди смогут дать сайт, где люди смогут дать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 5, more_info: more_info},
	{title: 'Площадка для стартапов', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 6, more_info: more_info},
	{title: 'Площадка для стартапов', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их обхединяться в стартапы и создавать их.', id: 7, more_info: more_info},
	{title: 'Площадка для стартаdwadwв', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 8, more_info: more_info}
];
app.post('/findStartups', function(req, res) {
	var res_sent = {
		isExistNextPage: true,
		startups: startups
	}
	if (req.body.find_str == "awd") {
		res_sent = {
			isExistNextPage: false,
			startups: [{title: 'ответ на awd str_search ;)', body: 'Создать сайт, где люди смогут обхединяться в стартапы и создавать их.', id: 4, more_info: more_info}]
		}
	}
	if (req.body.start_from > 8) res_sent.isExistNextPage = false;
	console.log(req.body);
	res.json(res_sent);
});


var messages = [
    {
        author_icon_path: '../../img/icon/vasia.jpg',
        author_name: 'Вася Васькин',
        time: '1557491016700',
        text: 'что то в сообщении'
    },
    {
        author_icon_path: '../../img/icon/vasia.jpg',
        author_name: 'Вася Васькин2',
        time: '12',
        text: 'что то в сообщении2'
    }
];

// Разовая первая инициальзация
app.get('/getMsgs', function(req, res) {
	var fmsg = {
        author_icon_path: '../../img/icon/vasia.jpg',
        author_name: 'Вася Васькин',
        time: '1557491016700',
        text: 'что то в сообщении'
    }
   res.json({
   	msgs: [fmsg, fmsg, fmsg, fmsg, fmsg, fmsg],
   	moreHistoryExists: true, // Есть ли предыдущие сообщения в истории
   	idFMsg: 25, // чтобы понимать с какого сообщ прошлые подгружать
   	idLMsg: 40 // чтобы понимать какие сообщения будут новыми
   });
});
app.post('/getNewMsgs', function(req, res) {
	console.log(req.body.idLMsg);
	var fmsg = {
        author_icon_path: '../../img/icon/vasia.jpg',
        author_name: 'Вася Васькин',
        time: '1557491016700',
        text: 'новые новые сообщения'
   }
   res.json({
   	msgs: [fmsg, fmsg],
   	idLMsg: 40 // чтобы понимать какие сообщения будут новыми
   });
});
app.post('/getHistoryMsgs', function(req, res) {
	console.log(req.body.idFMsg);
	// messages.push(req.body.text);
	var fmsg = {
        author_icon_path: '../../img/icon/vasia.jpg',
        author_name: 'Вася Васькин',
        time: '1557491016700',
        text: 'старые сообщения'
   }
   res.json({
   	msgs: [fmsg, fmsg, fmsg, fmsg],
   	moreHistoryExists: true,
   	idFMsg: 2
   });
});

app.post('/sendMsg', function(req, res) {
	console.log(req.body);
	// idLMsg Тут будет являться id этого сообщения которое отправлено по /sendMsg
	res.json({idLMsg: 5});
});

app.get('/getMembers', function(req, res) {
	var members = [
		{name: 'Вася Грингки', job: 'js программист', img_src: '../../img/icon/vasia.jpg', id: 21},
		{name: 'Вася Грингки2', job: 'маркетолог', img_src: '../../img/icon/vasia.jpg', id: 31},
		{name: 'Вася Грингки3', job: 'дизайнер', img_src: '../../img/icon/vasia.jpg', id: 41}
	];
	var isAdmin = true;
   res.json({
   	members: members,
   	isAdmin: isAdmin
   });
});
app.post('/delMember', function(req, res) {
	console.log(req.body.id);
	// messages.push(req.body.text);
	res.json({ans: true});
});

app.get('/getInvites', function(req, res) {
	var jobs = ['js программист', 'маркетолог', 'дизайнер'];
	var invites = [
		{name: 'Вася Грингки1', jobList: jobs, possitionWanted: 'маркетолог', aboute: 'знаю такие то языки, работал в таких то проектах', img_src: '../../img/icon/vasia.jpg', id: 21},
		{name: 'Вася Грингки2', jobList: jobs, possitionWanted: 'дизайнер', aboute: 'знаю такие то языки, работал в таких то проектах', img_src: '../../img/icon/vasia.jpg', id: 31},
		{name: 'Вася Грингки3', jobList: jobs, possitionWanted: 'маркетолог', aboute: 'знаю такие то языки, работал в таких то проектах', img_src: '../../img/icon/vasia.jpg', id: 41}
	];
   res.json({
   	invites: invites
   });
});
app.post('/ansOfInvite', function(req, res) {
	console.log('id = ' + req.body.id + ' ans = ' + req.body.answer + ' job = ' + req.body.job);
	// messages.push(req.body.text);
	res.json({name: 'Вася Грингки', job: req.body.job});
});

app.get('/exitFromStartup', function(req, res) {
   res.json('kaawdda');
});
app.post('/ChangeStartup', function(req, res) {
	// console.log(req.body);
	// body = { theme: '', description: '', shortDescr: '', peopleNeeded: '', contacts: '' }
	
   res.json({ans: 'awd'});
});



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
