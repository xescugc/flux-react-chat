var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var EventEmitter = require('events').EventEmitter;
var RoomStore = require('./RoomStore');
var _ = require('underscore');

var _messages = [];
var CHANGE_EVENT = 'change';
var ActionTypes = ChatConstants.ActionTypes;

var MessageStore = _.extend({}, EventEmitter.prototype, {
  getCreatedMessageData: function(message) {
    var date = Date.now();
    return {
      _id:     message._id    || 'm_' + date,
      date:    message.date   || new Date(date),
      roomId:  message.roomId || RoomStore.getCurrentRoom._id,
      text:    message.text,
      isRead:  message.isRead || true
    };
  },
  getAll: function() {
    return _messages;
  },
  getAllForCurrentRoom: function() {
    var roomId = RoomStore.getCurrentRoom._id;
    return _.where(_messages, function(message) {
      message.roomId === roomId;
    });
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
    case ActionTypes.CREATE_MESSAGE:
      var message = MessageStore.getCreatedMessageData({
        text: action.text
      });
      _messages.push(message);
      MessageStore.emitChange();
      break;
    default:
  }
});

module.exports = MessageStore;
