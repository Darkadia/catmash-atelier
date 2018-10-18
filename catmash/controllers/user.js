'use strict';
const passport = require('passport'),
      bodyParser = require('body-parser'),
      configEnv = require('./../config/env/default.js'),
      jwt = require('jsonwebtoken');

var Cats = require('../models/cats.model.js'),
    User = require('../models/user.model.js');

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
         token = jwt.sign(user.email, configEnv.jwtSecret);
         return res.status(200).json({user, token});
      })(req, res, next);
  },

  register : function(req, res, next) {
    passport.authenticate('local-signup', {session: false},
      function(err, user, info) {
        var token; 
        if(err){
          return res.status(401).json({
            succes: false,
            message: "Wront authentification"
          })
        }
        else if (!user) {
          return res.status(401).json({
            success: false,
            message: "Wrong username or password"
          });
        }
        token = jwt.sign(user.email, configEnv.jwtSecret);
        return res.status(200).json({user, token});
    })(req, res, next);
  },

  disconnect: function (req, res) {
    return res.status(200).send({
        success: true,
        message: "User successfully disconnected"
      });
  },

  getVotedCats : function (req, res) {
    var votedCats= [];
    User.findById(req.user.id)
    .then((err, user) => {
      votedCats = user.getVotedCats();
    }).catch((err) =>{
      throw (err);
    });
    return res.status(200).json(votedCats);
  }
};
