/* eslint-disable no-use-before-define */
import React from 'react-native';
const {
  PropTypes,
  Text,
  StyleSheet,
  TouchableHighlight,
} = React;

// this is our button style that should be reused across the app
const Button = ({ onPress, text }) => (
    <TouchableHighlight
      style={styles.button}
      underlayColor={'gray'}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableHighlight>
);

Button.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
};

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
