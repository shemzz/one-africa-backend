/*jshint esversion: 6 */
const express = require("express");
var router = express.Router();

const Artist = require("../models/artist");
const Eventz = require("../models/events");
const Newz = require("../models/newsfeed");
const Music = require("../models/music");
const Stream = require("../models/stream");
const StreamAdd = require("../models/stream");

// add livestream paid
router.post("/add_stream", (req,res,next) =>{
  let streamers = new Stream ({ email: req.body.email });
  streamers.save((err, streamers) =>{
    if (err) {
      res.json(err)
    }else {
      res.json({
        message: "streamer added success!!!"
      })
    }
  })
})


// retrieving data from database
router.get("/show_artist", (req, res, next) => {
  Artist.find(function(err, artists) {
    if (err) {
      res.json(err);
    } else {
      res.json(artists);
    }
  });
});

// add new artist
router.post("/add_artist", (req, res, next) => {
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
router.put("/update_artist/:id", (req, res, next) => {
  Artist.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: {
        artistName: req.body.artistName,
        slug: req.body.slug,
        artistPhoto: req.body.artistPhoto,
        artistBio: req.body.artistBio
      }
    },
    function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// delete artist
router.delete("/remove_artist/:id", (req, res, next) => {
  Artist.remove({ _id: req.params.id }, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// add new event
router.post("/new-event", (req, res, next) => {
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
router.get("/lineup", (req, res, next) => {
  Eventz.find(function(err, eventz) {
    if (err) {
      res.json(err);
    } else {
      res.json(eventz);
    }
  });
});

// add newsfeed
router.post("/addnews", (req, res, next) => {
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
router.get("/newsfeed", (req, res, next) => {
  Newz.find(function(err, news) {
    if (err) {
      res.json(err);
    } else {
      res.json(news);
    }
  });
});

// get music
router.get("/music", (req, res,next) => {
Music.find(function(err, songs) {
    if (err){
        res.json(err);
    }else{
        res.json(songs);
    }
})
});
// Post Music
router.post("/add_music", (req,res,next) =>{
    let Songs = new Music({
        name: req.body.name,
        artist: req.body.artist,
        album: req.body.album,
        url: req.body.url,
        cover_art_url: req.body.cover_art_url
    })
    Songs.save((err, songs) =>{
        if (err) {
            res.json(err)
        }else {
            res.json({
                msg: "song added success!!!"
            })
        }
    })
})



module.exports = router;
