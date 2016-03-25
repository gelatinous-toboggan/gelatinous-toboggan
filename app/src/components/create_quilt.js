/* eslint-disable no-use-before-define, react/prefer-stateless-function */
import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import { create } from '../assets/styles';
import { createQuilt } from '../actions/index';
import { MKButton } from 'react-native-material-kit';
import NavBar from './navbar';

const {
  PropTypes,
  View,
} = React;

const CustomButton = new MKButton.Builder()
.withText('Create Quilt')
.withStyle(create.button)
.withTextStyle(create.buttonText)
.build();

class CreateQuilt extends Component {
  constructor(props) {
    super(props);
    this.onCreatePress = this.onCreatePress.bind(this);
  }

  onCreatePress() {
    // todo: add users arguement
    this.props.createQuilt();
    this.props.navigator.push({ name: 'selectFriends' });
  }

  render() {
    return (
      <View style={create.container}>
        <NavBar onPress={this.props.navigator.pop} />
        <View style={create.buttonContainer}>
          <CustomButton onPress={this.onCreatePress} />
        </View>
      </View>
    );
  }
}

CreateQuilt.propTypes = {
  navigator: PropTypes.object,
  createQuilt: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  createQuilt: () => {
    dispatch(createQuilt());
  },
});

export default connect(null, mapDispatchToProps)(CreateQuilt);
