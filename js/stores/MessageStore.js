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
      _id:        message._id    || 'm_' + date,
      date:       message.date   || new Date(date).toJSON(),
      roomId:     message.roomId || RoomStore.getCurrentRoom()._id,
      text:       message.text,
      isCreated:  message.isCreated || false,
      //isRead:     message.isRead || false
    };
  },
  getAll: function() {
    return _messages;
  },
  getAllForCurrentRoom: function() {
    var room = RoomStore.getCurrentRoom();
    if (!_.isUndefined(room)) {
      return _.filter(_messages, function(message) {
        return message.roomId === room._id;
      });
    } else {
      return []
    }
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
    case ActionTypes.CREATING_MESSAGE:
      //var message = MessageStore.getCreatedMessageData({
        //text: action.text
      //});
      _messages.push(action.message);
      MessageStore.emitChange();
      break;
    case ActionTypes.CREATED_MESSAGE:
      _messages = _.map(_messages, function(message) {
        if (action.message.oldId == message._id) {
          return action.message
        } else {
          return message
        }
      });
      MessageStore.emitChange();
      break;
    case ActionTypes.FETCHED_MESSAGES:
      _messages = action.messages;
      MessageStore.emitChange();
      break;
    default:
  }
});

module.exports = MessageStore;
