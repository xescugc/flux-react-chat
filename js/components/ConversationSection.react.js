var React  = require('react');
var BPanel = require('react-bootstrap').Panel;

var ConversationSection = React.createClass({
  render: function() {
    return (
      <BPanel header={'Conversations'}>
      </BPanel>
    );
  }
});

module.exports = ConversationSection;
