/* eslint-disable no-use-before-define */
import React from 'react-native';
import Button from "./button";

const {
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

const onCreatePress = (navigator) => {
  navigator.push({ name: 'record' });
};

const CreateQuilt = ({ navigator }) => (
  <View style={styles.container}>
    <Text>Invite Friends</Text>
    <Text>+Friends</Text>
    <Button text={'Create!'} onPress={() => onCreatePress(navigator)} />
  </View>
);

CreateQuilt.propTypes = {
  navigator: PropTypes.object,
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

export default CreateQuilt;
