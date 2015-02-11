var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    CREATE_MESSAGE: null,
    CREATE_CONVERSATION: null
  }),

  PayloadSources: keyMirror({
    VIEW_ACTION: null
  })
};
