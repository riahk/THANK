var mongoose = require('mongoose');

var ThankSchema = new mongoose.Schema({
  body: String,
  likes: Number,
  date: { type: Date, default: Date.now }
});

var Thank = mongoose.model('Thank', ThankSchema);

module.exports = Thank;
