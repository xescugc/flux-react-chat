var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    CREATING_MESSAGE: null,
    CREATED_MESSAGE: null,
    CREATING_ROOM: null,
    CREATED_ROOM: null,
    FETCHED_ROOMS: null,
    CLICKING_ROOM: null,
    FETCHED_MESSAGES: null,
    NEW_MESSAGE: null,
    NEW_ROOM: null,
    CREATED_USER: null,
    UPDATED_ROOM: null
  }),

  PayloadSources: keyMirror({
    VIEW_ACTION: null,
    SERVER_ACTION: null,
    SOCKET_ACTION: null
  })
};
