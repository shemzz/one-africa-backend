/*jshint esversion: 6 */

var express = require ('express');
var mongoose = require('mongoose');
var bodyparser = require ('body-parser');
var cors = require('cors');

var app = express();

const route = require('./routes/route');

// connect to mongodb
mongoose.connect('mongodb://shemzz:123456de@ds131531.mlab.com:31531/oneafricaglobal');


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
    res.send('oneafrica has started working oh!');
});

app.listen(process.env.PORT || PORT)

