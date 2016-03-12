/* eslint-disable no-use-before-define */
import React from 'react-native';
import Button from './button';

const {
  PropTypes,
  StyleSheet,
  View,
} = React;

const Login = ({ onPress }) => (
  <View style={styles.container}>
    <Button text={'Start a Quilt'} onPress={onPress} />
    <Button text={'View Quilts'} onPress={onPress} />
  </View>
);

Login.propTypes = {
  onPress: PropTypes.func,
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
