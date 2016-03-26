/* eslint-disable react/prefer-stateless-function, no-use-before-define */
import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import LoginOrSignup from '../components/login_or_signup';
import { selectLoginOrSignup } from '../actions/index';
import { bindActionCreators } from 'redux';

class LoginOrSignupContainer extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(selection) {
    this.props.selectLoginOrSignup(selection);
    this.props.navigator.push({ name: 'login' });
  }

  render() {
    return (
      <LoginOrSignup onSelect={this.onSelect} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectLoginOrSignup }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginOrSignupContainer);