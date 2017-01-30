const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  name: {type: String, required:true},
  description: {type: String, required:true},
  link: {type: String, required:true},
  mainImage: {type: String, required:true},
  active: {type: Boolean, required:true},
});

module.exports = mongoose.model('Sale', schema);
