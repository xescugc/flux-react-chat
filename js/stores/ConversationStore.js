var ChatConstants = require('../constants/ChatConstants');
var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var _conversations = [];
var CHANGE_EVENT = 'change';
var ActionTypes = ChatConstants.ActionTypes;

var ConversationStore = _.extend({}, EventEmitter.prototype, {
  getCreatedConversationData: function(title) {
    var date = Date.now();
    return {
      id:     'm_' + date,
      date:   new Date(date),
      title:  title
    };
  },
  getAll: function() {
    return _conversations;
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

ConversationStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.CREATE_CONVERSATION:
      var conversation = ConversationStore.getCreatedConversationData(action.title);
      _conversations.push(conversation);
      ConversationStore.emitChange(); 
      break;
    default:
  }
});

module.exports = ConversationStore;
