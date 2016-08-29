var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userController = require('./users/userController.js');
var path = require('path');

var app = express();

var port = process.env.PORT || 8000;

app.listen(port);

mongoose.connect('mongodb://localhost/soFetch');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

app.post('/users/signup', userController.signup);
app.post('/users/login', userController.login);

module.exports = app;