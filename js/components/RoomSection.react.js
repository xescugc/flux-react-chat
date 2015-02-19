var React                  = require('react');
var _                      = require('underscore');
var RoomStore              = require('../stores/RoomStore');
var ChatRoomActionCreators = require('../actions/ChatRoomActionCreators');
var RoomItem               = require('./RoomItem.react');

var getStateFromStores = function() {
  return {
    rooms: RoomStore.getAll()
  };
};

var getRoomItem = function(room) {
  return (
    <RoomItem
      key={room._id}
      room={room}
    />
  );
};

var RoomSection = React.createClass({
  componentDidMount: function() {
    RoomStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    RoomStore.removeChangeListener(this._onChange);
  },
  render: function() {
    var buttonStyles = {
      marginTop: '-28px',
    };
    var roomListItems;
    if (this.state !== null) {
      roomListItems = _.map(this.state.rooms, getRoomItem);
    }
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <div className='panel-title'>{'Rooms'}</div>
          <div className='pull-right' style={buttonStyles}>
            <button className='btn btn-primary' onClick={this._onClickPlus}>
              <span className="glyphicon glyphicon-plus"></span>
            </button>
          </div>
        </div>
        <div className='panel-body list-group'>
          {roomListItems}
        </div>
      </div>
    );
  },

  _onClickPlus: function(event) {
    var name = prompt('Name of the room');
    if (!_.isUndefined(name) && !_.isEmpty(name)) {
      ChatRoomActionCreators.creatingRoom(name);
    }
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = RoomSection;
