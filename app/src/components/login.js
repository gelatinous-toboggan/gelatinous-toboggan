/* eslint-disable no-use-before-define */
import React from 'react-native';
import { MKButton, mdl } from 'react-native-material-kit';
import { login, colors } from '../assets/styles';

const {
  Component,
  PropTypes,
  View,
  Text,
} = React;

const Textfield = mdl.Textfield.textfield()
  .withAutoCorrect(false)
  .withStyle(login.textfield)
  .withUnderlineSize(2)
  .withHighlightColor(colors.auburn)
  .withTintColor(colors.auburn)
  .withTextInputStyle(login.textInput)
  .build();

const CustomButton = new MKButton.Builder()
  .withStyle(login.button)
  .build();

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onPress = this.onPress.bind(this);
    this.onTypeEmail = this.onTypeEmail.bind(this);
    this.onTypePassword = this.onTypePassword.bind(this);
  }

  onNavigate() {
    if (!this.props.isFetching && this.props.token) {
      if (this.props.loginOrSignup === 'login') {
        this.props.navigator.resetTo({ name: 'home' });
      } else {
        this.props.navigator.replace({ name: 'username' });
      }
    } else if (this.props.isFetching) {
      console.log('spinner!');
    }
  }

  onPress() {
    if (this.props.loginOrSignup === 'login') {
      this.props.loginUser(this.state.email, this.state.password)
        .then(() => {
          if (this.props.token) {
            this.props.navigator.resetTo({ name: 'home' });
          }
        });
    } else {
      this.props.signupUser(this.state.email, this.state.password)
        .then(() => {
          if (this.props.token) {
            this.props.navigator.replace({ name: 'username' });
          }
        });
    }
  }

  onTypeEmail(email) {
    return this.setState({ email });
  }

  onTypePassword(password) {
    return this.setState({ password });
  }

  render() {
    return (
      <View style={login.container}>
        <View style={login.containerHead}>
          <Text style={login.title}>Quilt</Text>
        </View>
        <View style={login.containerBody}>
          <Textfield
            value={this.state.email}
            onChangeText={this.onTypeEmail}
            placeholder={"Email Address"}
          />
          <Textfield
            value={this.state.password}
            onChangeText={this.onTypePassword}
            placeholder={"Password"}
          />
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
};


export default Login;
