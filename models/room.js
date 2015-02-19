var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RoomSchema   = new Schema({
  name:       String,
  isCreated:  Boolean,
  updatedAt:  Date,
  lastMessage: {
    author:   String,
    text:     String
  }
});

module.exports = mongoose.model('Room', RoomSchema);
