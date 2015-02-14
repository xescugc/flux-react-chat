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
    var messagesListItems;
    if (this.state !== null) {
      messagesListItems = _.map(this.state.messages, getMessageItem);
    } else {
      messagesListItems = 'No Messages';
    }
    var roomTitle = this.state.room ? this.state.room.title : ''
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'> {roomTitle} </div>
        <div className='panel-body'>
          {messagesListItems}
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
