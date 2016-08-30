var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userController = require('./server/users/userController.js');
var logController = require('./server/logs/logController.js');
var path = require('path');
var multer = require('multer');

var app = express();

var port = process.env.PORT || 4568;

app.listen(port);

mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/soFetch';
mongoose.connect(mongoURI);

//mongoose.connect('mongodb://localhost/soFetch');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/home', logController.getLogs);
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/public/index.html'));
});

app.put('/log', logController.updateLog);

app.delete('/log/:log_id', logController.deleteLog);

app.post('/log', logController.editLog);
app.post('/users/signup', userController.signup);
app.post('/users/login', userController.login);
app.post('/logWalk', logController.log);

module.exports = app;