var React = require('react');
var ChatApp = require('./components/ChatApp.react')

//React.render(
  //"<h1>TEST</h1>" , 
  //document.getElementById('react')
//);
React.render(
  <ChatApp />, 
  document.getElementById('react')
);
