/* eslint-disable no-use-before-define */
import React from 'react-native';
import CheckBox from './checkbox';

const {
  PropTypes,
  StyleSheet,
  TouchableOpacity,
} = React;

// todo: make these behave like check boxes (edit style=)
const FriendEntry = ({ user, onCheckboxCheck, onCheckboxUncheck, checked }) => (
  <TouchableOpacity style={styles.container}>
    <CheckBox
      label={user.username}
      id={user.id}
      checked={checked}
      onCheckboxCheck={onCheckboxCheck}
      onCheckboxUncheck={onCheckboxUncheck}
    />
  </TouchableOpacity>
);


FriendEntry.propTypes = {
  user: PropTypes.object,
  onCheckboxCheck: PropTypes.func,
  onCheckboxUncheck: PropTypes.func,
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
