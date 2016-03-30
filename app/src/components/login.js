/* eslint-disable no-use-before-define */
import React from 'react-native';
import { MKButton } from 'react-native-material-kit';
import { login, colors } from '../assets/styles';
import EmailInput from './email_input';
import PasswordInput from './password_input';
import NavBar from './navbar';
import Validator from 'email-validator';
import owasp from 'owasp-password-strength-test';
import Keychain from 'react-native-keychain';
import ip from '../config';
import _ from 'lodash';

const {
  Component,
  PropTypes,
  View,
  Text,
} = React;

const CustomButton = new MKButton.Builder()
  .withStyle(login.button)
  .build();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      strongPassword: false,
      validEmail: true,
    };

    owasp.config({
      allowPassphrases: true,
      maxLength: 128,
      minLength: 6,
      minPhraseLength: 10,
      minOptionalTestsToPass: 3,
    });

    this.onPress = this.onPress.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onTypeEmail = this.onTypeEmail.bind(this);
    this.onTypePassword = this.onTypePassword.bind(this);
    this.onCheckEmail = this.onCheckEmail.bind(this);
    this.debounceOnCheckEmail = _.debounce(this.onCheckEmail, 500, { 'leading': true });
  }

  onPress() {
    const emailToLowercase = this.state.email.toLowerCase();
    if (this.props.loginOrSignup === 'login') {
      this.props.loginUser(emailToLowercase, this.state.password)
        .then(() => {
          if (this.props.token) {
            Keychain.setInternetCredentials(`${ip}`, JSON.stringify(this.props.user), '')
              .then(() => {
                this.props.navigator.resetTo({ name: 'home' })
              });
          }
        });
    } else {
      if (!this.state.validEmail) {
        console.log(this.state.email, ' is invalid, please try again.');
      } else {
        this.props.signupUser(emailToLowercase, this.state.password)
        .then(() => {
          if (this.props.token) {
            Keychain.setInternetCredentials(`${ip}:8000`, this.props.username, this.props.token)
              .then(() => {
                this.props.navigator.replace({ name: 'username' });
              });
          }
        });
      }
    }
  }

  onBack() {
    this.props.navigator.pop();
  }

  onCheckEmail() {
    const emailToLowercase = this.state.email.toLowerCase();
    this.props.checkEmail({ email: emailToLowercase });
  }

  onTypeEmail(email) {
    this.setState({ email });
    this.setState({ validEmail: Validator.validate(this.state.email) });
    if (this.state.validEmail) {
      this.debounceOnCheckEmail();
    }
  }

  onTypePassword(password) {
    const result = owasp.test(password);
    this.setState({ password, strongPassword: result.strong });
  }

  render() {
    let errorMessage = <Text />;
    if (!this.state.validEmail) {
      errorMessage = <Text>Invalid email, please try again!</Text>;
    } else if (this.props.duplicateEmail) {
      errorMessage = <Text>Email already exists, please try again!</Text>;
    }

    let strongPasswordMessage = <Text />;
    if (!this.state.strongPassword && this.state.password && this.props.loginOrSignup !== 'login') {
      strongPasswordMessage = <Text>Weak Password!</Text>;
    }
    return (
      <View style={login.container}>
        <NavBar onPress={this.onBack} text={this.props.loginOrSignup === 'login' ? 'Login' : 'Sign Up'} />
        <View style={login.containerBody}>
          { errorMessage }
          <EmailInput
            value={this.state.email}
            onChangeText={this.onTypeEmail}
            placeholder={this.props.loginOrSignup === 'login' ? 'Username or Email' : 'Email Address'}
            autoFocus
          />
          <PasswordInput
            value={this.state.password}
            onChangeText={this.onTypePassword}
            placeholder={'Password'}
          />
          {strongPasswordMessage}
          <CustomButton onPress={this.onPress}>
            <Text style={login.buttonText}>{this.props.loginOrSignup}</Text>
          </CustomButton>
        </View>
      </View>
    );
  }
}

// todo: double check this
Login.propTypes = {
  navigator: PropTypes.object,
  fetchUser: PropTypes.func,
  isFetching: PropTypes.bool,
  token: PropTypes.string,
  loginOrSignup: PropTypes.string,
  loginUser: PropTypes.func,
  signupUser: PropTypes.func,
  duplicateEmail: PropTypes.bool,
  checkEmail: PropTypes.func,
};


export default Login;
