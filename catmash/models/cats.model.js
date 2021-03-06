/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;
require('path').default;

/**
* Cats Schema
 */

 var CatsSchema = new Schema ({
   created: {
     type: Date,
     default: Date.now
   },
   id: {
     type: String,
     required: true
   },
   imgUrl: {
     type: String,
     required: true
   },
   votes: {
     upvotes: {
       type: Number,
       required: true
     },
     downvotes: {
       type: Number,
       required: true
    }
  }
 });

 var Cat =  mongoose.model('Cat', CatsSchema);
 module.exports = Cat;
