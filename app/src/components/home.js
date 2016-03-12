import React from "react-native";
import Button from './button';

const {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;


class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button text={'Start a Quilt'} onPress={this.onPress} />
        <Button text={'View Quilts'} onPress={this.onPress} />
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
