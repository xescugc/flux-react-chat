var ChatConstants     = require('../constants/ChatConstants');
var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var EventEmitter      = require('events').EventEmitter;
var _                 = require('underscore');

var _user= {};
var CHANGE_EVENT = 'change';
var ActionTypes = ChatConstants.ActionTypes;

var UserStore = _.extend({}, EventEmitter.prototype, {
  getCurrentUser: function() {
    return _user;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

UserStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.CREATED_USER:
      _user = action.user;
      UserStore.emitChange();
      break;
    default:
  }
});

module.exports = UserStore;
