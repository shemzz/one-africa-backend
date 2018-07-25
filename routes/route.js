/*jshint esversion: 6 */

const express = require('express');
var router = express.Router();

const Artist = require('../models/artist');
const Eventz = require('../models/events');

// retrieving data from database 
router.get('/show_artist', (req, res, next) => {
    Artist.find(function (err, artists) {
        if (err) { 
            res.json(err);
        } else {
            res.json(artists);
        }
    });
});

// get event
router.get('/lineup', (req, res, next) => {
    Eventz.find(function (err, eventz) {
        if (err) { 
            res.json(err);
        } else {
            res.json(eventz);
        }
    });
});

// add new artist
router.post('/add_artist', (req, res, next) => {
    let newArtist = new Artist({
        artistName: req.body.artistName,
        slug: req.body.slug,
        artistPhoto: req.body.artistPhoto,
       artistBio: req.body.artistBio
    });
    newArtist.save((err, artist) => {
        if (err) {
            res.json(err);
        } else {
            res.json({
                msg: "Artist has been added successfully"
            });
        }
    });
});

// update artist
router.put('/update_artist/:id', (req, res, next) => {
   Artist.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                artistName: req.body.artistName,
                slug: req.body.slug,
                artistPhoto: req.body.artistPhoto,
               artistBio: req.body.artistBio
            }
        },
        function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
});

// delete artist
router.delete('/remove_artist/:id', (req, res, next) => {
   Artist.remove({_id: req.params.id}, function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
});

// add new event
router.post('/new-event', (req, res, next) => {
    let newEvent = new Eventz({
        name: req.body.name,
        slug: req.body.slug,
        photo: req.body.photo,
       location: req.body.location,
       address: req.body.address,
       date: req.body.date,
       ticket1: req.body.ticket1,
       ticket2: req.body.ticket2,
       ticket3: req.body.ticket3
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

module.exports = router;
