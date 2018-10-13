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
	})//Test if the api works well
  .use('/api/users', users)//Routes for user and authentification
  .use('/api/cats', cats)//Routes for cats api
};
