import React from 'react-native';
import { connect } from 'react-redux';
const {
  Component,
  Text,
  TextInput,
  View,
} = React;
import Button from '../components/button';
import PhoneInput from '../components/phone_input';
import { updateUser } from '../actions/index';
import { MKButton } from 'react-native-material-kit';
import { login } from '../assets/styles';

const CustomButton = new MKButton.Builder()
  .withStyle(login.button)
  .build();

class PhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.onType = this.onType.bind(this);
    this.onEnter = this.onEnter.bind(this);

    this.state = {
      phoneNumber: '',
    };

  }

  onType(phoneNumber) {
    this.setState({ phoneNumber });
  }

  onEnter() {
    this.props.updateUser(this.props.userId, { phoneNumber: this.state.phoneNumber, token: this.props.token });
    this.props.navigator.replace({ name: 'contacts' });
  }

  render() {
    return (
      <View style={login.container}>
        <View style={login.containerBody}>
          <Text>Please Enter Your Phone Number</Text>
          <PhoneInput
            value={this.state.phoneNumber}
            onChangeText={this.onType}
          />
          <CustomButton onPress={this.onEnter}>
            <Text style={login.buttonText}>{this.props.loginOrSignup}</Text>
          </CustomButton>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const user = state.get('user');
  return {
    userId: user.get('id'),
    token: user.get('token'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (id, data) => {
      dispatch(updateUser(id, data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumber);
