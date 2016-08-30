var bluebird = require('bluebird');
var mongoose = require('mongoose');

var LogSchema = new mongoose.Schema({
  petname: {
    type: String,
    required: true
  },
  time: String,
  poop: Boolean,
  pee: Boolean,
  other: Boolean,
  notes: String,
  user: String
});

module.exports = mongoose.model('Log', LogSchema);