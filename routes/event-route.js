/*jshint esversion: 6 */

const express = require('express');
var eventrouter = express.Router();

const Eventz = require('../models/events');

// add new event
router.post('/add_event', (req, res, next) => {
    let newEvent = new Eventz({
        name: req.body.name,
        slug: req.body.slug,
        photo: req.body.photo,
       location: req.body.location,
       address: req.body.address,
       date: req.body.date,
       ticket: {
        vendor: req.body.vendor,
       link: req.body.link,
       vendorphoto: req.body.vendorphoto
       }
    });
    newEvent.save((err, eventz) => {
        if (err) {
            res.json(err);
        } else {
            res.json({
                msg: "Event has been added successfully"
            });
        }
    });
});

module.exports = eventrouter;