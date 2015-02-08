var React  = require('react');
var MessageSection = require('./MessageSection.react');
var ThreadSection = require('./ThreadSection.react');
var BGrid  = require('react-bootstrap').Grid;
var BRow   = require('react-bootstrap').Row;
var BPanel = require('react-bootstrap').Panel;
var BCol   = require('react-bootstrap').Col;
//var ChatSection = require('./ChatSection')
//var ConversationsSection = require('./ConversationsSection')

var ChatApp = React.createClass({
  render: function() {
    return (
      <BGrid>
        <BRow>
          <BCol md={4}>
            <MessageSection />
          </BCol>
          <BCol md={6}>
            <ThreadSection />
          </BCol>
        </BRow>
      </BGrid>
    );
  }
})

module.exports = ChatApp;
