var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var _messages = [];
var CHANGE_EVENT = 'change';

var MessageStore = _.extend({}, EventEmitter.prototype, {
  getCreatedMessageData: function(text) {
    var date = Date.now();
    return {
      id:      'm_' + date,
      date:    new Date(date),
      text:    text,
      isRead:  true
    };
  },
  getAll: function() {
    return _messages;
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

MessageStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ChatConstants.CREATE_MESSAGE:
      var message = MessageStore.getCreatedMessageData(action.text);
      _messages.push(message);
      MessageStore.emitChange();
      break;
  }
});

module.exports = MessageStore;
