/*jshint esversion: 6 */

const mongoose = require("mongoose");


const musicschema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  album: {
      type: String,
      require: true
  },
  url: {
    type: String
  },
  cover_art_url: {
    type: String,
    required: true
  }
});

const Music = (module.exports = mongoose.model("Music", musicschema));
