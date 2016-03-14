/* eslint-disable no-use-before-define, react/prefer-stateless-function */
import React from 'react-native';
import Button from './button';

const {
  Component,
  PropTypes,
  StyleSheet,
  View,
} = React;

class Home extends Component {
  constructor(props) {
    super(props);
    this.onPressStart = this.onPressStart.bind(this);
    this.onPressView = this.onPressView.bind(this);
  }

  onPressStart() {
    this.props.navigator.push({ name: 'create' });
  }

  onPressView() {
    this.props.navigator.push({ name: 'view' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button text={'Start a Quilt'} onPress={this.onPressStart} />
        <Button text={'View Quilts'} onPress={this.onPressView} />
      </View>
    );
  }
}

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
