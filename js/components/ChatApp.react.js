var React  = require('react');
var MessageSection = require('./MessageSection.react');
var ConversationSection = require('./ConversationSection.react');

var ChatApp = React.createClass({
  render: function() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <ConversationSection />
          </div>
          <div className='col-md-6'>
            <MessageSection />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ChatApp;
