var ChatSocketActionCreators = require('../actions/ChatSocketActionCreators');
var socket = io();

socket.on('createdMessage', function(message) {
  console.log('socket message', message); 
  ChatSocketActionCreators.newMessage(message)
});
socket.on('createdRoom', function(room) {
  console.log('socket room', room); 
  ChatSocketActionCreators.newRoom(room);
});
