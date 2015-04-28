var express = require('express');
//var partials = require('express-partials');
var mongoose = require('mongoose');
var Thank = require('./db/thanks.js');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/thank');

var app = express();

app.use(express.static('../thank/www'));
app.use(bodyParser.json());

app.get('/api/thanks', function(req, res) {
  //return the current collection of thanks
  Thank.find().exec(function(err, thanks) {
    if (err) throw err;
    res.send(200, thanks);
  });

});

app.post('/api/thanks', function(req, res) {
  //post a thank to the database
  console.log('posting...');
  var thank = new Thank({ body: req.body.message, likes: 0 });
  thank.save(function(err) { if (err) throw err; res.send(201); });
});

module.exports = app;
