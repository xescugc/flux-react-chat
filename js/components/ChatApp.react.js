var React  = require('react');
var MessageSection = require('./MessageSection.react');
var ConversationSection = require('./ConversationSection.react');
var BGrid  = require('react-bootstrap').Grid;
var BRow   = require('react-bootstrap').Row;
var BCol   = require('react-bootstrap').Col;
//var ChatSection = require('./ChatSection')
//var ConversationsSection = require('./ConversationsSection')

var ChatApp = React.createClass({
  render: function() {
    return (
      <BGrid>
        <BRow>
          <BCol md={4}>
            <ConversationSection />
          </BCol>
          <BCol md={6}>
            <MessageSection />
          </BCol>
        </BRow>
      </BGrid>
    );
  }
});

module.exports = ChatApp;
