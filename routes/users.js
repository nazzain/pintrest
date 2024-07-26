
const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/application');

// Define the user schema


// Define a schema for the user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // Ensures that each username is unique
  },
  password: {
    type: String,
  
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],

  dp:{
    type: String,
    

  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  // profileImage:{
  //   type: String,

  fullname: {
    type: String,
    required: true,
  },

  
});

userSchema.plugin(plm);

// Create the User model using the schema
module.exports = mongoose.model('User', userSchema);


