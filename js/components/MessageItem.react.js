var React  = require('react');
var BWell = require('react-bootstrap').Well;

var MessageItem = React.createClass({
  propTypes: {
    message: React.PropTypes.object
  },

  render: function() {
    return (
      <BWell>
        <div className='pull-right'>
          {this.props.message.text}
        </div>
      </BWell>
    );
  }
});

module.exports = MessageItem;
