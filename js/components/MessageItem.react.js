var React  = require('react');

var MessageItem = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className='media'>
        <div className='media-left'>
          <img src='http://placehold.it/64x64'/>
        </div>
        <div className='media-body'>
          <h4 className='media-heading'>
            Owner
          </h4>
          {this.props.message.text}
        </div>
      </div>
    );
  }
});

module.exports = MessageItem;
