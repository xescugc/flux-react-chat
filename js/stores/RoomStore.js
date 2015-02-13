var ChatConstants = require('../constants/ChatConstants');
var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var _rooms = [];
var CHANGE_EVENT = 'change';
var ActionTypes = ChatConstants.ActionTypes;

var RoomStore = _.extend({}, EventEmitter.prototype, {
  getCreatedRoomData: function(name) {
    var date = Date.now();
    return {
      _id:        'm_' + date,
      name:       name,
      isCreated:  false
    };
  },
  getAll: function() {
    return _rooms;
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

RoomStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.CREATING_ROOM:
      var conversation = RoomStore.getCreatedRoomData(action.name);
      _rooms.push(conversation);
      RoomStore.emitChange(); 
      break;
    case ActionTypes.CREATED_ROOM:
      _rooms = _.map(_rooms, function(room) {
        if (room.name === action.room.name) {
          return action.room;
        } else {
          return room;
        }
      });
      RoomStore.emitChange();
      break;

    default:
  }
});

module.exports = RoomStore;
