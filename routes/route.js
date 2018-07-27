/*jshint esversion: 6 */

const express = require('express');
var router = express.Router();

var Mailchimp = require('mailchimp-api-v3');
var mailchimp = new Mailchimp(api_key);

const Artist = require('../models/artist');
const Eventz = require('../models/events');
const Newz = require("../models/newsfeed");

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
       cokobar: req.body.cokobar,
       eventbrite: req.body.eventbrite,
       ticketmaster: req.body.ticketmaster,
       platinumlist: req.body.platinumlist
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

// add newsfeed
router.post('/addnews', (req, res, next) => {
    let News = new Newz({
        title: req.body.title,
        body: req.body.body,
        date: req.body.date,
       time: req.body.time
    });
    News.save((err, news) => {
        if (err) {
            res.json(err);
        } else {
            res.json({
                msg: "News has beenposted successfully"
            });
        }
    });
});

// get news
router.get('/newsfeed', (req, res, next) => {
    Newz.find(function (err, news) {
        if (err) { 
            res.json(err);
        } else {
            res.json(news);
        }
    });
});

// subscribers
 router.post('/subscribe', (req, res) => {
    var api_key = '0e05e68abe0e8e60f3f034946db64ebd-3b1f59cf-e12195ea';
    var domain = 'sandboxbbf94d3430d9408b805df4180eb83fee.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
     
    // collect form data here
    var subdata = {
        companyName: req.body.companyName,
        companyAddress: req.body.companyAddress,
        contactPerson: req.body.contactPerson,
        positionOfContact: req.body.positionOfContact,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        website: req.body.website,
        proposal: req.body.proposal
    }
    var data = {
      from: 'New Partner WatchDog <postmaster@sandboxbbf94d3430d9408b805df4180eb83fee.mailgun.org>',
      to: 'davidshemang@gmail.com',
      subject: 'Partnership request from' + subdata.companyName,
      text: 'Here are the details of the application submitted'+
        subdata
    };
     
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });
 })

module.exports = router;
