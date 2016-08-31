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
    var am = req.body.am;
    var pm = req.body.pm;

    var newLog = new Log({
      petname: petname,
      time: time,
      poop: poop,
      pee: pee,
      dosage: dosage,
      medsGiven: medsGiven,
      am: am,
      pm: pm,
      notes: notes,
      user: user,
      logType: logType
    });

    newLog.save(function(err, newLog){
      if(err){
        res.send(500, err);
      }else{
        res.json({message: 'Log logged!'});
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
      }else{
        console.log(log);
        log.petname = req.body.petname || log.petname;
        log.time = req.body.time || log.time;
        log.poop = req.body.poo || false;
        log.pee = req.body.pee || false;
        log.notes = req.body.notes || log.notes;
        log.user = req.body.user || log.user;
        log.dosage = req.body.dosage || log.dosage;
        log.medsGiven = req.body.medsGiven || log.medsGiven;
        console.log(log);
        log.save(function(err){
          if(err){
            res.send(err);
          }else{
            res.json({message: 'Log updated!'});
          }
        })
      }
    })
  },

  deleteLog: function(req, res){
    console.log("ID", req.params.log_id);
    Log.remove({
          _id: req.params.log_id
      }, function(err, bear) {
        if (err){
          res.send(err);
        }else{
          res.json({ message: 'Successfully deleted' });
        }
      });
  }
}