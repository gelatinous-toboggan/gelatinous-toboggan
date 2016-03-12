/* eslint-disable no-use-before-define, react/prefer-stateless-function */
/*
I am unclear on how to approach this component. We're not supposed
to use arrow functions or binds in our jsx (see
https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/)
but we're also supposed to prefer stateless functions.
Since stateless functions are a convention, while arrow fns/bind in jsx is related
to preformance, I chose to use a class component here (disabling eslint as well)
*/

import React, { Component } from 'react-native';
import Button from './button';
import { connect } from 'react-redux';
import { startQuilt } from '../actions/index';

const {
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

class CreateQuilt extends Component {
  constructor(props) {
    super(props);
    this.onCreatePress = this.onCreatePress.bind(this);
  }

  onCreatePress() {
    // todo: add users arguement
    this.props.createQuilt();
    this.props.navigator.push({ name: 'camera' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Invite Friends</Text>
        <Text>+Friends</Text>
        <Button text={'Create!'} onPress={this.onCreatePress} />
      </View>
    );
  }
}

CreateQuilt.propTypes = {
  navigator: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  createQuilt: () => {
    dispatch(startQuilt());
  },
});

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

export default connect(null, mapDispatchToProps)(CreateQuilt);
