var bluebird = require('bluebird');
var mongoose = require('mongoose');
var User = require('../users/userModel.js');
var Pet = require('../pets/petModel.js');
var Schema = mongoose.Schema;

var LogSchema = new mongoose.Schema({
  // pet_id: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Pet'
  // },
  logType: {
    type: String
  },
  petname: {
    type: String,
    required: true
  },
  time: String,
  poop: Boolean,
  pee: Boolean,
  dosage: String,
  medsGiven: String,
  notes: String,
  user: String
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // }
});

module.exports = mongoose.model('Log', LogSchema);