var React  = require('react');

var RoomItem = React.createClass({
  propTypes: {
    conversation: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <div className='media'>
        <div className='media-body'>
          <h4 className='media-heading'>
          {this.props.conversation.title}
          </h4>
        </div>
      </div>
    )
  }
});

module.exports = RoomItem;
