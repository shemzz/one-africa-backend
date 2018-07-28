/*jshint esversion: 6 */

var express = require ('express');
var mongoose = require('mongoose');
var bodyparser = require ('body-parser');
var cors = require('cors');
const nodemailer = require('nodemailer');

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
     email_address: subemail,
     status: 'subscribed' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
}
// partner form
app.post('/partnership', (req, res) => {
    const output = `
      <p>You have a new Partnership request</p>
      <h3>Details details are</h3>
      <ul>  
        <li> Company Name: ${req.body.compname}</li>
        <li>Company Address: ${req.body.compaddress}</li>
        <li>Contact Person: ${req.body.contactperson}</li>
        <li>Position of Contact: ${req.body.positionofcontact}</li>
        <li>Phone Number: ${req.body.phone}</li>
        <li>Email: ${req.body.email}</li>
        <li>Website: ${req.body.website}</li>
        <li>Proposal: ${req.body.proposal}</li>
      </ul>
    `;
  
    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'vpq4n4ky2bv3xaho@ethereal.email', // generated ethereal user
        pass: 'mxMAd8f2mwdxH4x65Q'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"OAG Partnership Watchdog" <shemang@oneafricaglobal.com>', // sender address
      to: 'davidshemang@gmail.com', // list of receivers
      subject: 'New Partnership Request', // Subject line
      text: 'Hello Manager,', // plain text body
      html: output // html body
  };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('contact', {msg:'Email has been sent'});
    });
    });