var React = require('react');
var ChatApp = require('./components/ChatApp.react');
var ChatWebAPIUtils = require('./utils/ChatWebAPIUtils');

ChatWebAPIUtils.getRooms();

React.render(
  <ChatApp />, 
  document.getElementById('react')
);
