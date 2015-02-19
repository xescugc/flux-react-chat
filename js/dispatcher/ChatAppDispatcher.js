var _             = require('underscore');
var Dispatcher    = require('flux').Dispatcher;
var ChatConstants = require('../constants/ChatConstants');

var PayloadSources = ChatConstants.PayloadSources;

var ChatAppDispatcher = _.extend(new Dispatcher(), {
  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  },
  handleServerAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },
  handleSocketAction: function(action) {
    var payload = {
      source: PayloadSources.SOCKET_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = ChatAppDispatcher;
