/* eslint-disable no-use-before-define */
import React from 'react-native';
import Button from './button';

const {
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

const onPress = (navigator) => {
  navigator.push({ name: 'video' });
};

const QuiltEntry = ({ navigator }) => (
  <View style={styles.container} onClick={() => onPress(navigator)}>
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
