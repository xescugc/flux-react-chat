var React  = require('react');
var BInput = require('react-bootstrap').Input;
var BButton = require('react-bootstrap').Button;
var BGlyphicon = require('react-bootstrap').Glyphicon;
var ChatMessageActionCreators = require('../actions/ChatMessageActionCreators');

var ENTER_KEY_CODE = 13;

var MessageInput = React.createClass({

  getInitialState: function() {
    return {
      text: ''
    };
  },

  render: function() {
    return (
      <BInput type='text' value={this.state.text} onChange={this._onChange} onKeyDown={this._onKeyDownSendInput} buttonAfter={
        <BButton onClick={this._onClickSend} bsStyle='primary'>
          <BGlyphicon glyph='send' />
        </BButton>
      }/>
    );
  },

  _onChange: function(event) {
    this.setState({
      text: event.target.value
    });
  },

  _onClickSend: function(event) {
    ChatMessageActionCreators.createMessage(this.state.text); 
    this.setState({
      text: ''
    });
  },

  _onKeyDownSendInput: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._onClickSend(event);
    }
  },
});

module.exports = MessageInput;
