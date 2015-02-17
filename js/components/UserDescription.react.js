var React  = require('react');

var UserDescription = React.createClass({
  render: function() {
    var imageSrc = 'http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710cd50?s=64'
    return (
      <div>
        <img src={imageSrc} />
        <h3>Name</h3>
        <p>
        Name
        </p>
      </div>
    )
  }
})

module.exports = UserDescription;
