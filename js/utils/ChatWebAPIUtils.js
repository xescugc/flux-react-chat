var ChatRoomActionCreators = require('../actions/ChatRoomActionCreators');
var ChatMessageActionCreators = require('../actions/ChatMessageActionCreators');
var qwest = require('qwest');


module.exports = {
  createRoom: function(room) {
    console.log('createRoom');
    qwest.post('/api/rooms', {
      room: room
    }).then(function(response){
      console.log('success', response);
    }).catch(function(response){
      console.log('error', response);
    });
  },
  createMessage: function(room, message) {
  }
}
