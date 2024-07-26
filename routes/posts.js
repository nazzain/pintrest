// const mongoose = require('mongoose');

// // Define Post schema
// const postSchema = new mongoose.Schema({
//   postText: {
//     type: String,
//     required: true,
//   },
//   image: {
//   type: String
//   },
  
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   likes: {
//     type: Array,
//     default: [],
//   },
  
// });

// // Compile Post model
// module.exports = mongoose.model('Post', postSchema);
const mongoose = require('mongoose');

// Define Post schema
const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  title:{
    type:String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // description: {
  // type: String
  // },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Array,
    default: [],
  },
});

// Compile Post model
module.exports = mongoose.model('Post', postSchema);
