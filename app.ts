/// <reference path='./typings/tsd.d.ts' />
import * as path from "path";
import * as logger from "morgan";

import * as express from "express";
import favicon = require('serve-favicon');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');

import Request = express.Request;
import Response = express.Response;
import NextFunction = express.NextFunction;


import index = require('./routes/index');
import users = require('./routes/users');



let app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: true,
	sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
	let err: Error = new Error('Not Found');
	err['status'] = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

	app.use((err: any, req: Request, res: Response, next: NextFunction) => {
		res.status(err['status'] || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


export = app;
