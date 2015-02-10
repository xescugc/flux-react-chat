var React  = require('react');

var ConversationSection = React.createClass({
  render: function() {
    var buttonStyles = {
      marginTop: '-28px',
    };
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <div className='panel-title'>{'Conversations'}</div>
          <div className='pull-right' style={buttonStyles}>
            <button className='btn btn-primary' >
              <span className="glyphicon glyphicon-plus"></span>
            </button>
          </div>
        </div>
        <div className='panel-body'>
        </div>
      </div>
    );
  }
});

module.exports = ConversationSection;
