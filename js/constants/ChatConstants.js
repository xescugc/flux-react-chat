var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    CREATE_MESSAGE: null,
    CREATING_ROOM: null,
    CREATED_ROOM: null,
    FETCHED_ROOMS: null
  }),

  PayloadSources: keyMirror({
    VIEW_ACTION: null,
    SERVER_ACTION: null
  })
};
