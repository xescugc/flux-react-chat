var React  = require('react');
var UserDescription = require('./UserDescription.react');

var UserSection = React.createClass({
  render: function() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <div className='panel-title'>User</div>
        </div>
        <div className='panel-body list-group'>
          <UserDescription />
        </div>
      </div>
    )
  }
})

module.exports = UserSection;
