var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'ExpressJS'
});

// var orm = require("orm");

// orm.connect("mysql://username:password@host/database", function (err, db) {
//   if (err) throw err;
 
//     var Person = db.define("person", {
//         name      : String,
//         surname   : String,
//         age       : Number, // FLOAT
//         male      : Boolean,
//         continent : [ "Europe", "America", "Asia", "Africa", "Australia", "Antarctica" ], // ENUM type
//         photo     : Buffer, // BLOB/BINARY
//         data      : Object // JSON encoded
//     }, {
//         methods: {
//             fullName: function () {
//                 return this.name + ' ' + this.surname;
//             }
//         },
//         validations: {
//             age: orm.enforce.ranges.number(18, undefined, "under-age")
//         }
//     });
 
//     // add the table to the database
//     db.sync(function(err) {
//         if (err) throw err;
 
//         // add a row to the person table
//         Person.create({ id: 1, name: "John", surname: "Doe", age: 27 }, function(err) {
//             if (err) throw err;
 
//                 // query the person table by surname
//                 Person.find({ surname: "Doe" }, function (err, people) {
//                     // SQL: "SELECT * FROM person WHERE surname = 'Doe'"
//                 	if (err) throw err;
 
//                     console.log("People found: %d", people.length);
//                     console.log("First person: %s, age %d", people[0].fullName(), people[0].age);
 
//                     people[0].age = 16;
//                     people[0].save(function (err) {
//                         // err.msg = "under-age";
//                 });
//             });
 
//         });
//     });
// });

var account = require('./routes/account');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
	req.con = con;
	next();
});

app.use('/', account);
app.use('/account', account);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
