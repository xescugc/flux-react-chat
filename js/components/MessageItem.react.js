var React = require('react');

var MessageItem = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired
  },

  render: function() {
    var icon = this.props.message.isCreated ? 'ok' : 'time';
    var date = new Date(this.props.message.date).toLocaleFormat();
    var mediaRight, mediaLeft, textAlign, iconPosition;
    if (this.props.currentUser.img === this.props.message.author.img) {
      mediaRight =
        <div className='media-right'>
          <img src={this.props.message.author.img}/>
        </div>;
      textAlign = 'text-right';
      iconPosition = 'pull-left';
    } else {
      mediaLeft = 
        <div className='media-left'>
          <img src={this.props.message.author.img}/>
        </div>;
      textAlign = 'text-left';
      iconPosition = 'pull-right';
    }
    return (
      <div className='media'>
        {mediaLeft}
        <div className={'media-body ' + textAlign}>
          <p className={iconPosition}>
            <span className={'glyphicon glyphicon-'+ icon}></span> {date}
          </p>
          <h4 className='media-heading'>
            {this.props.message.author.name}
          </h4>
          <p>
            {this.props.message.text}
          </p>
        </div>
        {mediaRight}
      </div>
    );
  }
});

module.exports = MessageItem;
