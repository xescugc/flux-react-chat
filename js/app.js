var React = require('react');
var ChatApp = require('./components/ChatApp.react');
var ChatWebAPIUtils = require('./utils/ChatWebAPIUtils');
var ChatSocketIUtils = require('./utils/ChatSocketUtils');
var _ = require('underscore');

ChatWebAPIUtils.getRooms();
ChatWebAPIUtils.getMessages();

React.render(
  <ChatApp />, 
  document.getElementById('react')
);
var email;// = prompt('Enter you email');
if (!_.isUndefined(email) && !_.isEmpty(email)) {
  ChatWebAPIUtils.createUser(email);
} else {
  ChatWebAPIUtils.getUser();
}
