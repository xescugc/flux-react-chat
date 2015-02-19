var ChatConstants     = require('../constants/ChatConstants');
var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var EventEmitter      = require('events').EventEmitter;
var _                 = require('underscore');

var _rooms = [];
var CHANGE_EVENT = 'change';
var ActionTypes = ChatConstants.ActionTypes;

var sortRooms = function() {
  _rooms = _.sortBy(_rooms, function(room) {
    return room.updatedAt;
  }).reverse();
};

var RoomStore = _.extend({}, EventEmitter.prototype, {
  getCreatedRoomData: function(room) {
    var date = Date.now();
    return {
      _id:            room._id || 'r_' + date,
      name:           room.name,
      isCreated:      room.isCreated || false,
      isCurrent:      false,
      lastMessage:    room.lastMessage,
      updatedAt:      room.updatedAt
    };
  },
  getAll: function() {
    return _rooms;
  },
  getCurrentRoom: function() {
    return _.find(_rooms, function(room) {
      return room.isCurrent;
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
  },
});

RoomStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.CREATING_ROOM:
      var conversation = RoomStore.getCreatedRoomData({
        name: action.name
      });
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
    case ActionTypes.FETCHED_ROOMS:
      _rooms = _.map(action.rooms, RoomStore.getCreatedRoomData);
      RoomStore.emitChange();
      break;
    case ActionTypes.CLICKING_ROOM:
      _rooms = _.map(_rooms, function(room) {
        if (room._id === action.room._id) {
          room.isCurrent = true;
        } else {
          room.isCurrent = false;
        }
        return room;
      });
      RoomStore.emitChange();
      break;
    case ActionTypes.UPDATED_ROOM:
      _rooms = _.map(_rooms, function(room) {
        if (room._id === action.room._id) {
          action.room.isCurrent = room.isCurrent;
          return action.room;
        } else {
          return room;
        }
      });
      sortRooms();
      RoomStore.emitChange();
      break;

    default:
  }
});

module.exports = RoomStore;
