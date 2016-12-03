var express = require('express');
var router = express.Router();
var Equipment = require('../models/equipment');


var getEquipments = function(req, res) {
  var cursor = Equipment.find();
  cursor.exec(function(err, data) {
    if (err) {
      res.status(500);
      return res.json({
        errors: "Internal Server Error"
      });
    }
    return res.json({
      message: data
    });
  });
}

var getEquipmentsById = function(req, res) {
  var equipmentId = req.params['id'];
  var cursor = Equipment.find({
    where : {
      equipmentId : equipmentId
    }
  });
  cursor.exec(function(err, data) {
    if (err) {
      res.status(500);
      return res.json({
        errors: "Internal Server Error"
      });
    }
    return res.json({
      message: data
    });
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

router.get('/equipments',getEquipments);
router.get('/equipments/:id', getEquipmentsById);


module.exports = router;
