var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
var ActionTypes = ChatConstants.ActionTypes;

module.exports = {
  createRoom: function(title) {
    ChatAppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_ROOM,
      title: title
    });
    ChatWebAPIUtils.createRoom({
      title: title
    })
  }
};
