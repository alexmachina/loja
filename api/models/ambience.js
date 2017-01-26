const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  name: String,
  description: String,
  images: [String],
  mainImage: String,
  active: Boolean
});

module.exports = mongoose.model('Ambience', schema);
