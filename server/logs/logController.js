var Log = require('./logModel.js');
var Q = require('q');
var multer = require('multer');

var findLogs = Q.nbind(Log.find, Log);
var findLog = Q.nbind(Log.findOne, Log);

module.exports = {
  log: function(req, res){
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
    findLog({"_id": req.body.id})
      .then(function(log){
        res.json(log);
      })
      .catch(function(error){
        res.send(500, err);
      })
  },

  updateLog: function(req, res){
    Log.findById(req.body.id, function(err, log){
      if(err){
        res.send(err)
      }
      log.petname = req.body.petname;
      log.time = req.body.time;
      log.poop = req.body.poo;
      log.pee = req.body.pee;
      log.notes = req.body.notes;
      log.user = req.body.user;
      log.dosage = req.body.dosage;
      log.medsGiven = req.body.medsGiven;

      log.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({message: 'Log updated!'});
      })
    })
  },

  deleteLog: function(req, res){
    console.log("ID", req.params.log_id);
    Log.remove({
          _id: req.params.log_id
      }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
      });
  }
}