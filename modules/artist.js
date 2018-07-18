/*jshint esversion: 6 */

const mongoose = require('mongoose');

const artistschema = mongoose.Schema({
    artistName: {
        type: String
    },

    artistPhoto: {
        type: Stringe
    },

    artistBio: {
        type: String
    }

});

const Artist = module.exports = mongoose.model('Artist', artistschema);

