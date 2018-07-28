/*jshint esversion: 6 */

var express = require ('express');
var mongoose = require('mongoose');
var bodyparser = require ('body-parser');
var cors = require('cors');

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
    res.send('server started already');
});

app.post('/mailchimp', (req, res) =>{
addEmailToMailchimp(req.body.subemail);
res.end('Sucess!!!');
})
app.listen(process.env.PORT || PORT)

function addEmailToMailchimp(subemail){
    var request = require("request");

var options = { method: 'POST',
  url: 'https://us18.api.mailchimp.com/3.0/lists/0005e81f0f/members',
  headers: 
   { 'Postman-Token': 'cae74e89-0fa9-48c8-bdbd-9bcaa16839b6',
     'Cache-Control': 'no-cache',
     Authorization: 'Basic YW55c3RyaW5nOmE5Mzc0ZWJhYjFmMmZlOWVlNDMxMjFhNWEwYzVhY2Y2LXVzMTg=',
     'Content-Type': 'application/json' },
  body: 
   { FNAME: 'Subscriber',
     email_address: req.body.subemail,
     status: 'subscribed' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
}