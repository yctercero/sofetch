var bluebird = require('bluebird');
var mongoose = require('mongoose');
var User = require('../users/userModel.js');
var Schema = mongoose.Schema;

var PetSchema = new mongoose.Schema({
  petname: {
    type: String,
    required: true
  },
  notes: String,
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Pet', PetSchema);