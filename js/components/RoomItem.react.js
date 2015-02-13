var React  = require('react');

var RoomItem = React.createClass({
  propTypes: {
    room: React.PropTypes.object.isRequired
  },
  render: function() {
    var defaultClass = 'list-group-item';
    var classNames = this.props.room.isCreated ? defaultClass : defaultClass + ' ' + 'disabled';
    return (
      <a href='#' className={classNames}>
        <h4>{this.props.room.name}</h4>
        <p>
          Message
        </p>
      </a>
    )
  }
});

module.exports = RoomItem;
