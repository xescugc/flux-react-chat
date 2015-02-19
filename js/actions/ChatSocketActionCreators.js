var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants     = require('../constants/ChatConstants');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {
  newRoom: function(room) {
    ChatAppDispatcher.handleSocketAction({
      type: ActionTypes.NEW_ROOM,
      room: room
    });
  },

  newMessage: function(message) {
    ChatAppDispatcher.handleSocketAction({
      type:     ActionTypes.NEW_MESSAGE,
      message:  message
    });
  },

  updatedRoom: function(room) {
    ChatAppDispatcher.handleSocketAction({
      type: ActionTypes.UPDATED_ROOM,
      room: room
    });
  }
};
