var React  = require('react');
var BPanel = require('react-bootstrap').Panel

var MessageSection = React.createClass({
  render: function() {
    return (
      <BPanel header={'Conversations'}>
      </BPanel>
    )
  }
})

module.exports = MessageSection;
