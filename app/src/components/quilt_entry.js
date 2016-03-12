/* eslint-disable no-use-before-define */
import React from 'react-native';
import Button from './button';

const {
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

const onPress = (navigator) => {
  navigator.push({ name: 'video' });
};

const QuiltEntry = ({ navigator, onClick }) => (
  <TouchableOpacity style={styles.container} onPress={() => onPress(navigator)}>
    <View>
      <Text>Title</Text>
      <Text>Theme</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default QuiltEntry;
