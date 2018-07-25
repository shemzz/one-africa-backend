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

const eventschema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: true
  },
  cokobar: {
    type: String,
    required: true
  },
  eventbrite: {
    type: String,
    required: false
  },
  ticketmaster: {
    type: String,
    required: false
  },
  platinumlist: {
    type: String,
    required: false
  }
});

const Eventz = (module.exports = mongoose.model("Eventz", eventschema));
