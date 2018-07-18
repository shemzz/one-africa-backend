/*jshint esversion: 6 */

var crypto = require('crypto');

var jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      hash: String,
      salt: String 
      });

      // setting the password through a function 
      userSchema.methods.setPassword = function(password){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
      };
      
      // checking the password validity
      userSchema.methods.validPassword = function(password) {
        var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
        return this.hash === hash;
      };

      // generate JWT
      userSchema.methods.generateJwt = function() {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
      
        return jwt.sign({
          _id: this._id,
          email: this.email,
          name: this.name,
          exp: parseInt(expiry.getTime() / 1000),
        }, "MY_SECRET");
         // DO NOT KEEP YOUR SECRET IN THE CODE!
      };

const Item = module.exports = mongoose.model('User', userschema);

