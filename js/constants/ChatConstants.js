var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    CREATING_MESSAGE: null,
    CREATED_MESSAGE: null,
    CREATING_ROOM: null,
    CREATED_ROOM: null,
    FETCHED_ROOMS: null,
    CLICKING_ROOM: null
  }),

  PayloadSources: keyMirror({
    VIEW_ACTION: null,
    SERVER_ACTION: null
  })
};
