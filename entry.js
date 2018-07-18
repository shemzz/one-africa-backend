/*jshint esversion: 6 */

var express = require ('express');
var mongoose = require('mongoose');
var bodyparser = require ('body-parser');
var cors = require('cors');

var app = express();

const route = require('./routes/route');

// connect to mongodb
// mongoose.connect('mongodb://localhost:27017/artists');
mongoose.connect('mongodb://shemzz:123456de@ds131531.mlab.com:31531/oneafricaglobal');


// on connection
mongoose.connection.on('conected', ()=>{
    console.log('MongoDB conected at port 27017');
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
    res.send('shemzz has started working oh!');
});

app.listen(process.env.PORT || PORT)

