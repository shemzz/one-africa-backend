/*jshint esversion: 6 */

const mongoose = require("mongoose");

const newsschema = mongoose.Schema({
  title: {
  type: String,
  required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: String,
    require: true
  },
  time: {
    type: String,
    required: true
  }
})

const News = (module.exports = mongoose.model("News", newsschema));

