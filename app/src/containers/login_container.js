import React from 'react-native';
import { connect } from 'react-redux';
import Login from '../components/login';
import { setUser } from '../actions/index';
import { bindActionCreators } from 'redux';

const {
  Component,
  View,
} = React;

class LoginContainer extends Component {
  render() {
    return (
      <Login {...this.props} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginContainer);
