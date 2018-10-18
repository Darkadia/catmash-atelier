'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	config = require("./env/default");

const  passportJWT = require("passport-jwt"),
        LocalStrategy = require('passport-local').Strategy,
   	    JWTStrategy = passportJWT.Strategy,
   	    ExtractJWT = passportJWT.ExtractJwt,
  	    bcrypt = require('bcrypt');

module.exports = function(passport) {

	passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : config.jwtSecret,
        passReqToCallback: true
    },
    function (req, jwtPayload, done) {
         return User.findOne({'email': jwtPayload}, function(err, user)  {
				if (user){
				 done(null, user);
				}
            })
            .catch(err => {
                console.log(err);
                done(err);
              });
    	     }
		  ));

		passport.use('local-login', new LocalStrategy ({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
		},
		function(req, username, password, done) {
			User.findOne({'username': username})
			.exec(function(err, user) {
				if (err) {
					return done(false, null, 'Error occured');
				}
				else if (!user) {
					return done(false, null, 'Wrong username or wrong password');
				}
				bcrypt.compare(password, user.password, function(err, success)  {
          if (err) {
            console.log(err);
          }
          if (success == true) {
						return done(null, user, 'User successfully logged');
          }
          else {
              return done(null, false, { message: 'Incorrect username.' });
          }
        });
			});
		})),

	//Signup local strategy
	passport.use('local-signup', new LocalStrategy ({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, user, password, done) {

		if (req.body.length > 1e6) {
				req.connection.destroy();
			}
			process.nextTick(function() {
			User.findOne({'username': req.body.username})
			.exec(function(err, user) {
				if (err){
					console.log('error happenned');
					return done(err);
				}
				console.log(req.body.username);
				if (user) {
					console.log(user);
					console.log('User ' + req.body.username + ' already exists');
					return done(null, false, 'User already exists in database');
				}

				var newUser = new User({
          			username : req.body.username,
					email : req.body.email,
					password : req.body.password
				});
				newUser.save(function(err) {
					if (err){
						throw err;
						return done(err);
					}
					return done(null, newUser, "User " + newUser.username + " successfully created");
				});
			});
		})
	})
	);
};
