/* eslint-disable no-use-before-define */
import React from 'react-native';
import Button from './button';

const {
  PropTypes,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

const onPress = (navigator) => {
  navigator.push({ name: 'video' });
};

const QuiltEntry = ({ navigator, onClick, username }) => (
  <View>
    <TouchableHighlight onPress={onPress}>
      <View style={styles.row}>
        <Text>{username}</Text>
        <Text>+</Text>
      </View>
    </TouchableHighlight>
  </View>
);

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  }
});

export default QuiltEntry;
