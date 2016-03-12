import React from "react-native";
const {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;


import Button from './button'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Hello World'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Enter a Username</Text>
        <TextInput
          style={styles.input}
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
        />
        <Button text={'Log In'} onPress={this.onPress} />
      </View>
    );
  }
}



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
})


export default Login;
