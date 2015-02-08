var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

module.exports = {
  createMessage: function(text) {
    ChatAppDispatcher.handleViewAction({
      action: ChatConstants.CREATE_MESSAGE,
      text: text
    });
  }
};
