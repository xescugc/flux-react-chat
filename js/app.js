var React = require('react');
var ChatApp = require('./components/ChatApp.react');
var ChatWebAPIUtils = require('./utils/ChatWebAPIUtils');
var ChatSocketIUtils = require('./utils/ChatSocketUtils');

ChatWebAPIUtils.getRooms();
ChatWebAPIUtils.getMessages();

React.render(
  <ChatApp />, 
  document.getElementById('react')
);
