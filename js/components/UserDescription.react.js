var React  = require('react');

var UserDescription = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <div>
        <img src={this.props.user.img} />
        <h3>Name</h3>
        {this.props.user.name}
      </div>
    );
  }
});

module.exports = UserDescription;
