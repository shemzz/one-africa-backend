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
  vendorphoto : {
    type : mongoose.Schema.Type.ObjectId,
    ref:'ticket'
        }
});

const Eventz = (module.exports = mongoose.model("Eventz", eventschema));

// ticket model
var ticketSchema = new Schema({
    vendor: [String],
   link: [String],
   vendorphoto: [String]
     })
mongoose.model('ticket', ticketSchema, 'ticket')
