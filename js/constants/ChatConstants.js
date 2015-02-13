var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    CREATE_MESSAGE: null,
    CREATING_ROOM: null,
    CREATED_ROOM: null
  }),

  PayloadSources: keyMirror({
    VIEW_ACTION: null
  })
};
