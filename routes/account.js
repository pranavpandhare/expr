var express = require('express');
var router = express.Router();
async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
	var con = req.con;
	async.parallel(
		[
			function(callback){
				con.query('select * from users', function(errors, accounts){
					callback(errors, accounts);
				})
			}
		],
		function(err, results){
			var data = {accounts: results[0]};
			res.status(200).render('account/index', data);
		}
	);
});

router.get('/add', function(req, res, next) {
	res.render('account/add');
});

router.post('/add', function(req, res, next) {
	var con = req.con;
	async.parallel(
		[
			function(callback){
				con.query('insert into users(name, age, email) values(?,?,?)', [req.body.name, req.body.age, req.body.email] , function(errors, accounts){
					callback(errors);
				})
			}
		],
		function(err, results){
			res.status(200).redirect('/account');
		}
	);
});

router.get('/delete/:name', function(req, res, next) {
	var con = req.con;
	async.parallel(
		[
			function(callback){
				con.query('delete from users where name = ?', [req.params.name] , function(errors, accounts){
					callback(errors);
				})
			}
		],
		function(err, results){
			res.status(200).redirect('/account');
		}
	);
});

router.get('/edit/:name', function(req, res, next) {
	var con = req.con;
	async.parallel(
		[
			function(callback){
				con.query('select * from users where name = ?', [req.params.name] , function(errors, accounts){
					callback(errors, accounts[0]);
				})
			}
		],
		function(err, results){
			var data = {account: results[0]};
			res.status(200).render('account/edit', data);
		}
	);
});

module.exports = router;
