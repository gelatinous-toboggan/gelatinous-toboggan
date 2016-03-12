/* eslint-disable no-use-before-define */
import React from 'react-native';
import Button from './button';

const {
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

const QuiltEntry = () => (
  <View style={styles.container}>
    <Text>Title</Text>
    <Text>Theme</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default QuiltEntry;
