var express = require('express');
var router = express.Router();
var cats = require('../controllers/cats');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({success: true, message: "Route for cats"});
})
      .get('/list', cats.listAll)
      .get('/update', cats.updateCatList)
      .post('/:id', cats.voteCat)
      .get('/seed', cats.seedDb);

module.exports = router;
