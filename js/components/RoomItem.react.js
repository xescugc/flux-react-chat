var React  = require('react');
var ChatRoomActionCreators = require('../actions/ChatRoomActionCreators');
var s = require('underscore.string');

var RoomItem = React.createClass({
  propTypes: {
    room: React.PropTypes.object.isRequired
  },
  render: function() {
    var defaultClass = 'list-group-item';
    var disabled = this.props.room.isCreated ?  '' : 'disabled';
    var active = this.props.room.isCurrent ? 'active' : '';
    var classNames = s.join(' ', defaultClass, disabled, active);
    return (
      <a href='#' className={classNames} onClick={this._onClick}>
        <h4>{this.props.room.name}</h4>
        <p>
          Message
        </p>
      </a>
    )
  },
  _onClick: function(event) {
    ChatRoomActionCreators.clickRoom(this.props.room);
  }
});

module.exports = RoomItem;
