var React  = require('react');

var MessageItem = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired
  },

  render: function() {
    var icon = this.props.message.isCreated ? 'ok' : 'time';
    var date = new Date(this.props.message.date).toLocaleFormat();
    return (
      <div className='media'>
        <div className='media-body text-right'>
          <p className='pull-left'>
            <span className={'glyphicon glyphicon-'+ icon}></span> {date}
          </p>
          <h4 className='media-heading'>
            Owner
          </h4>
          <p>
            {this.props.message.text}
          </p>
        </div>
        <div className='media-right'>
          <img src='http://placehold.it/64x64'/>
        </div>
      </div>
    );
  }
});

module.exports = MessageItem;
