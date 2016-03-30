/* eslint-disable react/prefer-stateless-function, no-use-before-define */
import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import Login from '../components/login';
import { loginUser, signupUser } from '../actions/index';
import { bindActionCreators } from 'redux';
import { checkEmail } from '../actions/index';

class LoginContainer extends Component {
  render() {
    return (
      <Login {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const user = state.get('user');
  return {
    loginOrSignup: user.get('loginOrSignup'),
    duplicateEmail: user.get('duplicateEmail'),
    isFetching: user.get('isFetching'),
    token: user.get('token'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser, signupUser, checkEmail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
