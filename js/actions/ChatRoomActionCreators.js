var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants     = require('../constants/ChatConstants');
var ChatWebAPIUtils   = require('../utils/ChatWebAPIUtils');
var ActionTypes       = ChatConstants.ActionTypes;

module.exports = {
  creatingRoom: function(name) {
    ChatAppDispatcher.handleViewAction({
      type: ActionTypes.CREATING_ROOM,
      name: name 
    });
    ChatWebAPIUtils.createRoom({
      name: name 
    });
  },
  clickRoom: function(room) {
    ChatAppDispatcher.handleViewAction({
      type: ActionTypes.CLICKING_ROOM,
      room: room
    });
  }
};
