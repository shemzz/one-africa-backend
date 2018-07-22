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
  ticket: {
    vendor: {
      type: String,
      required: true
    },
    link: {
        type: String,
        required: true
    },
    vendorPhoto: {
        type: String,
        required: true
    }
  }
});

const OagEvent = (module.exports = mongoose.model("OagEvent", eventschema));
