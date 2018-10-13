'use strict';

var bodyParser = require('body-parser');
const configEnv = require('./../config/assets/default');

module.exports = {
  login : function(req, res, next) {
    var token;
    passport.authenticate('local-login', { session: false },
      function (err, user, info) {
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Wrong username or password"
          });
        }
         token = jwt.sign(user.email, configEnv.jwt_secret);
         return res.status(200).send({user, token});
      })(req, res, next);
  },

  register : function(req, res, next) {
    passport.authenticate('local-signup', {session: false},
      function(err, user, info) {
        return res.status(201).send("User successfully created");
    });
  },

  disconnect: function (req, res) {
    return res.status(200).send({
        success: true,
        message: "User successfully disconnected"
      });
  }
};