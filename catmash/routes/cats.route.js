var express = require('express');
var router = express.Router();
var passport = require("passport");
var cats = require('../controllers/cats');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({success: true, message: "Route for cats"});
})
      .get('/list', cats.listAll) //List all the cats, upvotes and downvotes
      .get('/update', passport.authenticate("jwt", {session: false}), cats.updateCatList)//update for the user, 30 cats at a time
      .post('/:id', passport.authenticate("jwt", {session: false}), cats.voteCat)//Vote for cats, can be donwvote or upvote in the body
      .get('/seed', cats.seedDb); // Route to delete

module.exports = router;
