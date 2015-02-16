var React  = require('react');
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
      <div className='input-group'>
        <input type='text' className='form-control' value={this.state.text} onChange={this._onChange} onKeyDown={this._onKeyDownSendInput}/> 
        <span className='input-group-btn'>
          <button onClick={this._onClickSend} className='btn btn-primary' disabled={d}>
            <span className="glyphicon glyphicon-send"></span>
          </button>
        </span>
      </div> 
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
      ChatMessageActionCreators.creatingMessage(this.state.text); 
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
