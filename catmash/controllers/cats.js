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
  
  getCatsUpdate : function(id) {
    var userVotesCatIds = [];

    return new Promise(resolve => {
    User.findById(id, function(err, user) {
      user["votedCats"].forEach(function(cat) {
        userVotesCatIds.push(cat.idCat);
      });
      resolve(userVotesCatIds);
      })
    })
  },

  updateCatList : async function(req, res) {
    var catIds = await module.exports.getCatsUpdate(req.user.id);

    if (catIds.length > 0) {
    Cats.find({ _id : { $nin: catIds } })
    .limit(30)
    .exec(function(err, cats) {
      return res.status(200).json({success: true, foundCats: cats});
    });
  }
    else {
    Cats.find()
    .limit(30)
    .exec(function(err, cats) {
      return res.status(200).json({success: true, foundCats: cats});
    });
    }

  },

  voteCat: function(req, res) {
    var idCat = req.params.id;
    var vote = req.body.vote;

    User.update({'_id': req.user.id}, { 
      $push: { 'votedCats':{ 'idCat': idCat, 'vote': vote }}},
       function(err, value) {
        if (err) {
          throw(err);
        }
    });

    Cats.findById(idCat, function(err, cat) {
      if (err) {
        throw(err);
      }
      else if (vote === false) {
        cat.votes.downvotes += 1;
        cat.save(function(err, updatedCat) {
          if (err) return handleError(err);
          return res.status(200);
        })
      }
      else {
        cat.votes.upvotes += 1;
        cat.save(function(err, updatedCat) {
          if (err) return handleError(err);
          return res.status(200);
        })
      }
    });
  },

  seedDb : async function (req, res) {
    var jsonData = await module.exports.fetchCats();
    var cats = [];
    jsonData.images.forEach(function(catObj) {
      var tempCat = new Cats();
      tempCat.imgUrl = catObj.url,
      tempCat.id = catObj.id;
      tempCat.votes = {};
      tempCat.votes.upvotes = 0;
      tempCat.votes.downvotes = 0;
     cats.push(tempCat);
    })
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
      throw(e);
    });  
    });
  }
};