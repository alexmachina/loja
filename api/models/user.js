const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  username:{type: String, required:true},
  password:{type: String, required:true}
});

module.exports = mongoose.model('User', schema);
