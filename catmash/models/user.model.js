
/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;
  require('path').default;

/**
 * UserModel Schema
 */
var UserSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  personnal: {
    firstname: {type: String},
    lastname: {type:String}
  },
  libelle: {
    type: String
  },
  votedCats: [{
    vote: Boolean,
    idCat : {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'cats',
    },
    default: []
  }]
});


UserSchema.pre('save', function(next) {
  var user = this;
  console.log("passed");
  bcrypt.genSalt(10, function(err, salt)  {
    if (err) {return next(err);}
    else {
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {return next(err);}
      else {
      console.log(hash);
      user.password = hash;
      return next();
    }
    });
  }
  });
});

UserSchema.methods.comparePassword =  function (candidatePassword){
  let password = this.password;
  bcrypt.compare(candidatePassword, this.password, (err, success) => {
  if (success == true) {
    return true;}
  if (err) return false;
  });
}

UserSchema.statics = {
  getCatsId: function() {
    var usersVotesCatId = [];
    User.find({})
    .exec(function(err, users) {
      if (err) {
        throw(err);
      }
      users.forEach(function(user) {
        usersVotesCatId.push(user.vote.idCat);
      });
    });
    return usersVotesCatId;
  },

  generateHash : async function(password) {
    return new Promise (resolve => {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) {return next(err);}
        else {
          bcrypt.hash(password, salt, function(err, hash) {
            if (err) {return err;}
            else {
              resolve(hash);
            }
          });
        }
      });
    });
  }
}

module.exports = mongoose.model('User', UserSchema);
