var React          = require('react');
var MessageSection = require('./MessageSection.react');
var RoomSection    = require('./RoomSection.react');
var UserSection    = require('./UserSection.react');

var ChatApp = React.createClass({
  render: function() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
            <RoomSection />
          </div>
          <div className='col-md-6'>
            <MessageSection />
          </div>
          <div className='col-md-3'>
            <UserSection />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ChatApp;
