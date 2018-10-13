var express = require('express');
var passport = require("passport");
var router = express.Router();
var user = require("../controllers/user");
// var users = require('')

/* GET users listing. */
router.get('/', function(req, res){ res.status(200).json({success: true, message: "something"})})
      .get('/disconnect', passport.authenticate('jwt', {session : false}), user.disconnect)
      .post('/register', passport.authenticate('local-signup', {session : false}), user.register)
      .post('/authenticate', passport.authenticate('local-login', {session : false}), user.login);

module.exports = router;
