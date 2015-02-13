var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RoomSchema   = new Schema({
  name:       String,
  isCreated:  Boolean
});

module.exports = mongoose.model('Room', RoomSchema);
