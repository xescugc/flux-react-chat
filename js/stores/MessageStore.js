var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants     = require('../constants/ChatConstants');
var EventEmitter      = require('events').EventEmitter;
var RoomStore         = require('./RoomStore');
var UserStore         = require('./UserStore');
var _                 = require('underscore');

var _messages = [];
var CHANGE_EVENT = 'change';
var ActionTypes = ChatConstants.ActionTypes;

var sortMessages = function() {
  _messages = _.sortBy(_messages, function(message) {
    return message.date;
  });
};

var MessageStore = _.extend({}, EventEmitter.prototype, {
  getCreatedMessageData: function(message) {
    var date = Date.now();
    var user = UserStore.getCurrentUser();
    return {
      _id:        message._id    || 'm_' + date,
      date:       message.date   || new Date(date).toJSON(),
      roomId:     message.roomId || RoomStore.getCurrentRoom()._id,
      text:       message.text,
      isCreated:  message.isCreated || false,
      author: {
        name: user.name,
        img: user.img
      }
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
      return [];
    }
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  getMessageById: function(id) {
    return _.find(_messages, function(message) {
      return message._id === id;
    });
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
      _messages.push(action.message);
      sortMessages();
      MessageStore.emitChange();
      break;
    case ActionTypes.CREATED_MESSAGE:
      _messages = _.map(_messages, function(message) {
        if (action.message.oldId === message._id) {
          return action.message;
        } else {
          return message;
        }
      });
      sortMessages();
      MessageStore.emitChange();
      break;
    case ActionTypes.FETCHED_MESSAGES:
      _messages = action.messages;
      MessageStore.emitChange();
      break;
    case ActionTypes.NEW_MESSAGE:
      var newId = MessageStore.getMessageById(action.message._id);
      var oldId = MessageStore.getMessageById(action.message.oldId);
      if (_.isUndefined(newId) && _.isUndefined(oldId)){
        _messages.push(action.message);
      }
      sortMessages();
      MessageStore.emitChange();
      break;
    default:
  }
});

module.exports = MessageStore;
