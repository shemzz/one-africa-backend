/*jshint esversion: 6 */

var express = require ('express');
var mongoose = require('mongoose');
var bodyparser = require ('body-parser');
var cors = require('cors');
var fs=require('fs');
var multer=require('multer');

var app = express();

const route = require('./routes/route');

// connect to mongodb
mongoose.connect('mongodb://shemzz:123456de@ds131531.mlab.com:31531/oneafricaglobal');
// mongoose.connect('mongodb://localhost:27017/artistlist');


// on connection
mongoose.connection.on('conected', ()=>{
    console.log('MongoDB conected to heroku app');
});

// on connection error
mongoose.connection.on('error', (err)=>{
    console.log(err);
});


const PORT =  3000;

// adding middleware - cors
app.use(cors());

// body parser
app.use(bodyparser.json());

app.use('/api', route);

app.get('/',(req, res) =>{
    res.send('oneafrica has started working but is not Posting!');
});

app.listen(process.env.PORT || PORT)

