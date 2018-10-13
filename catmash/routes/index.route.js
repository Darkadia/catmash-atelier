var express = require('express');
var passport = require('passport');
var router = express.Router();

//Route routeFiles
var users = require('./users.route.js');
var cats = require('./cats.route.js');

module.exports = function (app) {
	/* GET api listing. */
	app.get('/api', (req, res) => {
	  res.send('API works');
	})
  .use('/api/users', users)
  .use('/api/cats', cats)
};
