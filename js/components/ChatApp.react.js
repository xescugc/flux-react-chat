var React  = require('react');
var MessageSection = require('./MessageSection.react');
var RoomSection = require('./RoomSection.react');

var ChatApp = React.createClass({
  render: function() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <RoomSection />
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
