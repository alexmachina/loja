const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type:String, required: true}
});

module.exports = mongoose.model('Category',schema);
