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
      alert('error', response);
    });
  },
  createMessage: function(room, message) {
  },
  getRooms: function() {
    qwest.get('/api/rooms',{},{
      responseType: 'json'
    }).then(function(response){
      console.log('success', response);
      ChatServerActionCreators.fetchedRooms(response);
    }).catch(function(response){
      alert('error', response);
    });
  }
}
