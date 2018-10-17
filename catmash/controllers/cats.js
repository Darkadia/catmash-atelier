'use strict';

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require("http");
var https = require("https");
var Cats = require('../models/cats.model.js');
var User = require('../models/user.model.js');

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;
require('path').default;

module.exports = {
  listAll : function(req, res) {
    Cats.find({}, function (err, cats) {
      return res.status(200).json(cats);
    });
  },

  updateCatList : function(req, res) {
    var catIds = User.getCatsId;

    Cats.find({ id : { $nin: catIds } })
    .limit(30)
    .exec(function(err, cats) {
      console.log(cats);
      return res.status(200).json({success: true, foundCats: cats});
    });
  },

  voteCat: function(req, res) {
    var idCat = req.params.id;
    var vote = req.body.vote;

    Cats.findById(idCat, function(err, cat) {
      if (err) {
        throw(err);
      }
      else if (vote === false) {
        cat.vote.downVotes = cat.vote.downVotes + 1;
        return res.status(200);
      }
      else {
        cat.vote.downVotes = cat.vote.downVotes + 1;
        return res.status(200);
      }
    });
  },

  seedDb : async function (req, res) {
    var jsonData = await module.exports.fetchCats();
    var cats = [];
    console.log("Ok très bien");
    jsonData.images.forEach(function(catObj) {
      var tempCat = new Cats();
      tempCat.imgUrl = catObj.url,
      tempCat.id = catObj.id;
      tempCat.upvotes = 0;
      tempCat.downvotes = 0;
      cats.push(tempCat);
    })
    console.log("lenght of the json", cats.length);
    Cats.insertMany(cats).then((err, info) => {
      console.log("Cats updated in database");
    }).catch((err) => {
      throw err;
    })
    return res.status(200).json(jsonData);
  },

  fetchCats : () => {
    var url = 'https://latelier.co/data/cats.json';
    var JsonResponse;
    return new Promise(resolve => {
      https.get(url, function(res){
        var body = '';

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
          JsonResponse = JSON.parse(body);
          resolve(JsonResponse);
        });
    }).on('error', function(e){
    console.log("Got an error: ", e);
    });  
    });
  }
};



