/* eslint-disable no-use-before-define */
import React from 'react-native';
import Button from './button';

const {
  PropTypes,
  StyleSheet,
  View,
} = React;

const onPressStart = (navigator) => {
  navigator.push({ name: 'video' }); //should be create
};

const onPressView = (navigator) => {
  navigator.push({ name: 'view' });
};

const Home = ({ navigator }) => (
  <View style={styles.container}>
    <Button text={'Start a Quilt'} onPress={() => onPressStart(navigator)} />
    <Button text={'View Quilts'} onPress={() => onPressView(navigator)} />
  </View>
);

Home.propTypes = {
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

export default Home;
