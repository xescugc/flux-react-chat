var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatWebAPIUtils   = require('../utils/ChatWebAPIUtils');
var ChatConstants     = require('../constants/ChatConstants');
var MessageStore      = require('../stores/MessageStore');
var ActionTypes       = ChatConstants.ActionTypes;

module.exports = {
  creatingMessage: function(text) {
    var message = MessageStore.getCreatedMessageData({
      text: text
    });
    ChatAppDispatcher.handleViewAction({
      type: ActionTypes.CREATING_MESSAGE,
      message: message
    });
    ChatWebAPIUtils.createMessage(message);
  }
};
