/* eslint-disable no-use-before-define */
import React from 'react-native';
import CheckBox from './checkbox';

const {
  PropTypes,
  StyleSheet,
  TouchableOpacity,
} = React;

// todo: make these behave like check boxes (edit style=)
const FriendEntry = ({ user, onCheck, checked }) => (
  <TouchableOpacity style={styles.container}>
    <CheckBox
      label={user.username}
      id={user.id}
      checked={checked}
      onCheck={onCheck}
    />
  </TouchableOpacity>
);


FriendEntry.propTypes = {
  user: PropTypes.object,
  onCheck: PropTypes.func,
  checked: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  username: {
    paddingTop: 20,
    paddingLeft: 10,
  },
});

export default FriendEntry;
