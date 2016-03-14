/* eslint-disable no-use-before-define */
import React from 'react-native';

const {
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

// todo: make these behave like check boxes
const FriendEntry = ({ username }) => (
  <TouchableOpacity style={styles.container}>
    <View>
      <Text>{username}</Text>
    </View>
  </TouchableOpacity>
);

FriendEntry.propTypes = {
  username: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FriendEntry;
