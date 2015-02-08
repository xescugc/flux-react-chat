var _ = require('underscore');
var Dispatcher = require('flux').Dispatcher;
var ChatConstants = require('../constants/ChatConstants');

var ChatAppDispatcher = _.extend(new Dispatcher(), {
  handleViewAction: function(action) {
    var payload = {
      source: ChatConstants.PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = ChatAppDispatcher;
