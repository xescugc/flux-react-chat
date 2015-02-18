var React  = require('react');
var UserStore = require('../stores/UserStore');
var UserDescription = require('./UserDescription.react');

var userDescription = function(user) {
  return (
    <UserDescription
      user={user}
    />
  )
};

var getStateFromStores = function() {
  return {
    user: UserStore.getCurrentUser()
  }
}

var UserSection = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },
  
  render: function() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <div className='panel-title'>User</div>
        </div>
        <div className='panel-body list-group'>
          {userDescription(this.state.user)}
        </div>
      </div>
    )
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
})

module.exports = UserSection;
