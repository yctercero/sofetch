var Log = require('./logModel.js');
var Q = require('q');
var multer = require('multer');

var findLogs = Q.nbind(Log.find, Log);
var findLog = Q.nbind(Log.findOne, Log);

module.exports = {
  log: function(req, res){
    console.log(req.body);
    var petname = req.body.petname;
    var time = req.body.time;
    var poop = req.body.poo;
    var pee = req.body.pee;
    var notes = req.body.notes;
    var user = req.body.user;
    var logType = req.body.logType;
    var dosage = req.body.dosage;
    var medsGiven = req.body.medsGiven;

    var newLog = new Log({
      petname: petname,
      time: time,
      poop: poop,
      pee: pee,
      dosage: dosage,
      medsGiven: medsGiven,
      notes: notes,
      user: user,
      logType: logType
    });

    newLog.save(function(err, newLog){
      if(err){
        res.send(500, err);
      }
    })
  },

  getLogs: function(req, res){
    findLogs({})
      .then(function (logs) {
        res.json(logs);
      })
      .catch(function (error) {
        res.send(500, err);
      });
  },

  editLog: function(req, res){
    console.log(res.data);
    console.log(req.params.id);
    findLog({"_id": req.body.id})
      .then(function(log){
        res.json(log);
      })
      .catch(function(error){
        res.send(500, err);
      })
  }
}