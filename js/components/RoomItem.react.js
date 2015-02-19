var React                  = require('react');
var _                      = require('underscore');
var ChatRoomActionCreators = require('../actions/ChatRoomActionCreators');
var s                      = require('underscore.string');

var createLastMessage = function(room) {
  if (!_.isUndefined(room.lastMessage)){ 
    return (
      <p>
        {room.lastMessage.author}: {room.lastMessage.text}
      </p>
    );
  }
};

var RoomItem = React.createClass({
  propTypes: {
    room: React.PropTypes.object.isRequired
  },
  render: function() {
    var defaultClass = 'list-group-item';
    var disabled = this.props.room.isCreated ?  '' : 'disabled';
    var active = this.props.room.isCurrent ? 'active' : '';
    var classNames = s.join(' ', defaultClass, disabled, active);
    var lastMessage = createLastMessage(this.props.room);
    return (
      <a href='#' className={classNames} onClick={this._onClick}>
        <h4>{this.props.room.name}</h4>
        {lastMessage}
      </a>
    );
  },
  _onClick: function(event) {
    ChatRoomActionCreators.clickRoom(this.props.room);
  }
});

module.exports = RoomItem;
