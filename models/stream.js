/*jshint esversion: 6 */

const mongoose = require("mongoose");


const streamschema = mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
        required: true,
        validate: {
            isAsync: true,
            validator: function(value, isValid) {
                const self = this;
                return self.constructor.findOne({ email: value })
                .exec(function(err, user){
                    if(err){
                        throw err;
                    }
                    else if(user) {
                        if(self.id !== user.id) {  // if finding and saving then it's valid even for existing email
                            return isValid(true);
                        }
                        return isValid(false);  
                    }
                    else{
                        return isValid(false);
                    }

                })
            },
            message:  'The email address is already taken!'
        },
  }
});

const Stream = (module.exports = mongoose.model("Stream", streamschema));

const streamaddschema = mongoose.Schema({
    email: {
      type: String,
      lowercase: true,
          required: true,
          validate: {
              isAsync: true,
              validator: function(value, isValid) {
                  const self = this;
                  return self.constructor.findOne({ email: value })
                  .exec(function(err, user){
                      if(err){
                          throw err;
                      }
                      else if(user) {
                          if(self.id === user.id) {  // if finding and saving then it's valid even for existing email
                              return isValid(true);
                          }
                          return isValid(false);  
                      }
                      else{
                          return isValid(true);
                      }
  
                  })
              },
              message:  'The email address is already taken!'
          },
    }
  });
  
  const StreamAdd = (module.exports = mongoose.model("StreamAdd", streamaddschema));
