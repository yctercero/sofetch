var bluebird = require('bluebird');
var mongoose = require('mongoose');
var User = require('../users/userModel.js');
var Schema = mongoose.Schema;

var PetSchema = new mongoose.Schema({
  name: String,
  vetName: String,
  vetAddress: String,
  vetPhone: String,
  allergies: String,
  medications: String,
  microchip: String,
  notes: String,
  ownerPhone: String,
  ownerId: Number,
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Pet', PetSchema);