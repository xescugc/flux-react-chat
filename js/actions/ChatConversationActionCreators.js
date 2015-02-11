var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ActionTypes = ChatConstants.ActionTypes;

module.exports = {
  createConversation: function(title) {
    ChatAppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_CONVERSATION,
      title: title
    });
  }
};
