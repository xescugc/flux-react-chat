var ChatConstants = require('../constants/ChatConstants');
var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var _rooms = [];
var CHANGE_EVENT = 'change';
var ActionTypes = ChatConstants.ActionTypes;

var RoomStore = _.extend({}, EventEmitter.prototype, {
  getCreatedRoomData: function(title) {
    var date = Date.now();
    return {
      id:     'm_' + date,
      date:   new Date(date),
      title:  title
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
    case ActionTypes.CREATE_ROOM:
      var conversation = RoomStore.getCreatedRoomData(action.title);
      _rooms.push(conversation);
      RoomStore.emitChange(); 
      break;
    default:
  }
});

module.exports = RoomStore;
