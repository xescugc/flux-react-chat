var React  = require('react');
var BPanel = require('react-bootstrap').Panel;
var MessageStore = require('../stores/MessageStore');
var MessageInput = require('./MessageInput.react');
var MessageItem = require('./MessageItem.react');
var _ = require('underscore');


var getStateFromStores = function() {
  return {
    messages: MessageStore.getAll()
  };
};

var getMessageItem = function(message) {
  return (
    <MessageItem
      key={message.id}
      message={message}
    />
  );
};

var MessageSection = React.createClass({

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var messagesListItems;
    if (this.state !== null) {
      messagesListItems = _.map(this.state.messages, getMessageItem);
    } else {
      messagesListItems = 'No Messages';
    }
    return (
      <BPanel header={'Chat'}>
        {messagesListItems}
        <MessageInput />
      </BPanel>
    );
  },

  _onChange: function(event) {
    this.setState(getStateFromStores());
  }

});

module.exports = MessageSection;
