/*jshint esversion: 6 */

const mongoose = require('mongoose');

const itemschema = mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },

    itemQuantity: {
        type: String,
        required: true
    },

    itemBought: {
        type: Boolean,
        required: true
    }

});

const Item = module.exports = mongoose.model('Item', itemschema);

