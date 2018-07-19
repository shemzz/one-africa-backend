/*jshint esversion: 6 */

const mongoose = require('mongoose');

const artistschema = mongoose.Schema({
    artistName: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    artistPhoto: {
        type: String
    },
    artistBio: {
        type: String,
        required: true
    }

});

const Artist = module.exports = mongoose.model('Artist', artistschema);

