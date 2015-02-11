var React  = require('react');
var _ = require('underscore');
var ConversationStore = require('../stores/ConversationStore');
var ChatConversationActionCreators = require('../actions/ChatConversationActionCreators');
var ConversationItem = require('./ConversationItem.react');

var getStateFromStores = function() {
  return {
    conversations: ConversationStore.getAll()
  }
};

var getConversationItem = function(conversation) {
  return (
    <ConversationItem
      key={conversation.id}
      conversation={conversation}
    />
  );
};

var ConversationSection = React.createClass({
  componentDidMount: function() {
    ConversationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ConversationStore.removeChangeListener(this._onChange);
  },
  render: function() {
    var buttonStyles = {
      marginTop: '-28px',
    };
    var conversationListItems;
    if (this.state !== null) {
      conversationListItems = _.map(this.state.conversations, getConversationItem);
    }
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <div className='panel-title'>{'Conversations'}</div>
          <div className='pull-right' style={buttonStyles}>
            <button className='btn btn-primary' onClick={this._onClickPlus}>
              <span className="glyphicon glyphicon-plus"></span>
            </button>
          </div>
        </div>
        <div className='panel-body'>
        {conversationListItems}
        </div>
      </div>
    );
  },

  _onClickPlus: function(event) {
    var name = prompt('Name of the room');
    if (!_.isUndefined(name) && !_.isEmpty(name)) {
      ChatConversationActionCreators.createConversation(name);
    }
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = ConversationSection;
