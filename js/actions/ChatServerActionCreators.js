var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {
  createdRoom: function(room) {
    ChatAppDispatcher.handleServerAction({
      type: ActionTypes.CREATED_ROOM,
      room: room
    });
  }
}
