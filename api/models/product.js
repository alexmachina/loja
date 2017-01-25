const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  mainImage: String,
  images:[String],
  active: {type: Boolean, required:true}
});

module.exports = mongoose.model('Product', schema);
