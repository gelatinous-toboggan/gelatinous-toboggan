import React from 'react-native';
const {
  Component,
  Text,
  StyleSheet,
  TouchableHighlight,
} = React;

const Button = ({onPress, text}) => {
  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor={'gray'}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: 'black',
    marginTop: 10,
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
  },
});

export default Button;
