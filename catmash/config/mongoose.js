'use strict';

var config = require("./env/default");
var assets = require("./assets/default");
var mongoose = require('mongoose');
var path=require('path');
var glob = require('glob');

module.exports = {

  initDb : function () {
    mongoose.connect(config.db.localUri);
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("Connected to database Catmash");
    });
  },
  initModels : function (callback) {
      // Globbing model files
      glob.sync(assets.models).forEach( function( file ) {
        require(path.resolve(file));
      });
      if (callback) callback();
    }
};
