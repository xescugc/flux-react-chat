var React  = require('react');
var BInput = require('react-bootstrap').Input;
var BButton = require('react-bootstrap').Button;
var BGlyphicon = require('react-bootstrap').Glyphicon;
var ChatMessageActionCreators = require('../actions/ChatMessageActionCreators');
var s = require('underscore.string');

var ENTER_KEY_CODE = 13;

var MessageInput = React.createClass({

  getInitialState: function() {
    return {
      text: '',
      canSend: false
    };
  },

  render: function() {
    var d = this.state.canSend ? false : true;
    return (
      <BInput type='text' value={this.state.text} onChange={this._onChange} onKeyDown={this._onKeyDownSendInput} buttonAfter={
        <BButton onClick={this._onClickSend} bsStyle='primary' disabled={d}>
          <BGlyphicon glyph='send' />
        </BButton>
      }/>
    );
  },

  _onChange: function(event) {
    var text = event.target.value;
    this.setState({
      text: text,
      canSend: this._checkCanSend(text)
    });
  },

  _onClickSend: function(event) {
    if (!s.isBlank(this.state.text)){
      ChatMessageActionCreators.createMessage(this.state.text); 
      this.setState({
        text: ''
      });
    }
  },

  _onKeyDownSendInput: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._onClickSend(event);
    }
  },

  _checkCanSend: function(text) {
    if (text.length > 0 && !this.state.canSend) {
      return true;
    } else if (text.length === 0 && this.state.canSend){
      return false;
    } else {
      return this.state.canSend;
    }
  }
});

module.exports = MessageInput;
