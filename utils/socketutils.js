var mongoose = require('mongoose');
var Equipment = require('../models/equipment');
var q = require('q');


var cleanData = function(data) {
    var newdata = {};
    var values = data.split(":")[1].split("|");
    values.forEach(function(val) {
        if (val) {
            var temp = val.split("=");
            if (temp[0] == "54") {
                if (temp[1] == "1") {
                    newdata.activity = 1;
                } else if (temp[1] == "2") {
                    newdata.activity = -1;
                }
            } else if (temp[0] == "48") {
                newdata.equipmentId = parseInt(temp[1]);
            } else if (temp[0] == "32") {
                newdata.count = parseInt(temp[1]);
            } else {}
        }
    })
    return newdata;
}

var updateData = function(result, defer) {
    var newcount = result.activity * result.count;
    Equipment.update({
        equipmentId: result.equipmentId,
    }, {
        $inc: {
            position: newcount
        }
    }, {
        upsert: true
    }, function(err, res) {
        if (err) {
            defer.reject(err);
        }
        console.log(result);
        defer.resolve("updated");
    });
}


var parseData = function(data, db, done) {
    var defer = q.defer();
    var results = cleanData(data);
    if (results.hasOwnProperty('activity') && results.hasOwnProperty('equipmentId') && results.hasOwnProperty('count')) {
        updateData(results, defer);
    } else {
        defer.reject('err');
        return;
    }
    return defer.promise;
}

module.exports.parseData = parseData;
