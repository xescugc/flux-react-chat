var React  = require('react');
var MessageStore = require('../stores/MessageStore');
var RoomStore = require('../stores/RoomStore');
var MessageInput = require('./MessageInput.react');
var MessageItem = require('./MessageItem.react');
var _ = require('underscore');


var getStateFromStores = function() {
  return {
    messages: MessageStore.getAllForCurrentRoom(),
    room:     RoomStore.getCurrentRoom()
  };
};

var getMessageItem = function(message) {
  return (
    <MessageItem
      key={message._id}
      message={message}
    />
  );
};

var MessageSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores()
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
    RoomStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
    RoomStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var roomName, messagesListItems;
    if (!_.isUndefined(this.state.room)) {
      messagesListItems = _.isEmpty(this.state.messages) ? 'No Messages' : _.map(this.state.messages, getMessageItem);
      roomName = this.state.room.name;
    }
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'> {roomName} </div>
        <div className='panel-body'>
          {messagesListItems}
        </div>
        <div className='panel-footer'>
          <MessageInput />
        </div>
      </div>
    );
  },

  _onChange: function(event) {
    this.setState(getStateFromStores());
  }

});

module.exports = MessageSection;
