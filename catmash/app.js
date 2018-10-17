var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var glob = require('glob');
var cors = require('cors')

//Config files
var assets = require("./config/assets/default");
var mongoose = require('./config/mongoose');

//Init connection to MongoDb Database and models
mongoose.initDb();
mongoose.initModels();

//Init all routes
glob.sync(assets.routes).forEach( function( file ) {
  require(path.resolve(file));
});

//Init express framework
var app = express();

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Init passport middleware (Authentification middleware)
var passport = require("passport");
require('./config/passport-strategies')(passport);
app.use(passport.initialize());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Enable CORS
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, authorization');
  res.header('Access-Control-Expose-Headers', 'Authorization');

  next();
}
app.use(allowCrossDomain);

//Init routes index file
require('./routes/index.route.js')(app);




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
