var ChatServerActionCreators = require('../actions/ChatServerActionCreators');
var qwest = require('qwest');


module.exports = {
  createRoom: function(room) {
    qwest.post('/api/rooms', {
      room: room
    },{
      responseType: 'json'
    }).then(function(response){
      console.log('success', response);
      ChatServerActionCreators.createdRoom(response)
    }).catch(function(response){
      console.log('error', response);
      alert('error', response);
    });
  },
  createMessage: function(message) {
    qwest.post('/api/rooms/' + message.roomId + '/messages', {
      message: message
    },{
      responseType: 'json'
    }).done(function(response) {
      console.log(response);
      ChatServerActionCreators.createdMessage(response);
    }).fail(function(response) {
      console.log('error', response);
      alert('error', response);
    });
  },
  getRooms: function() {
    qwest.get('/api/rooms',{},{
      responseType: 'json'
    }).then(function(response){
      console.log('success', response);
      ChatServerActionCreators.fetchedRooms(response);
    }).catch(function(response){
      console.log('error', response);
      alert('error', response);
    });
  }
}
