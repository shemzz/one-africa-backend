/*jshint esversion: 6 */

const mongoose = require("mongoose");

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
  ticket1: {
    type: String,
    required: true
  },
  ticket2: {
    type: String,
    required: false
  },
  ticket3: {
    type: String,
    required: false
  }
});

const Eventz = (module.exports = mongoose.model("Eventz", eventschema));
