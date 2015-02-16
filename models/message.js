var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
  text:       String,
  date:       String,
  isCreated:  Boolean,
  roomId:     String
});

module.exports = mongoose.model('Message', MessageSchema);