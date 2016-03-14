/* eslint-disable no-use-before-define */
import React from 'react-native';
import Button from './button';

const {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

// todo: make these behave like check boxes
class FriendEntry extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <View>
          <Text>{this.props.username}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FriendEntry;
