/* eslint-disable no-use-before-define */
import React from 'react-native';
const {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;


import Button from './button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Hello World',
    };

    this.onPress = this.onPress.bind(this);
    this.onType = this.onType.bind(this);
  }

  onPress() {
    this.props.setUser(this.state.username);
    this.props.navigator.push({ name: 'home' });
  }

  onType(username) {
    return this.setState(username);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Enter a Username</Text>
        <TextInput
          style={styles.input}
          value={this.state.username}
          onChangeText={this.onType}
        />
        <Button text={'Log In'} onPress={this.onPress} />
      </View>
    );
  }
}

// todo: double check this
Login.propTypes = {
  navigator: PropTypes.object,
  setUser: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
  },
});


export default Login;
