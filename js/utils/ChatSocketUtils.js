var ChatSocketActionCreators = require('../actions/ChatSocketActionCreators');
var socket = io();

socket.on('createdMessage', function(message) {
  ChatSocketActionCreators.newMessage(message);
});
socket.on('createdRoom', function(room) {
  ChatSocketActionCreators.newRoom(room);
});
socket.on('updatedRoom', function(room) {
  console.log('socket updated room', room); 
  ChatSocketActionCreators.updatedRoom(room);
});
