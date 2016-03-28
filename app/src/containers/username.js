import React from 'react-native';
import { connect } from 'react-redux';
const {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;
import { updateUser } from '../actions/index';
import Button from '../components/button';

class Username extends Component {
  constructor(props) {
    super(props);
    this.onType = this.onType.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.state = {
      username: '',
    };
  }

  onType(username) {
    this.setState({ username });
  }

  onEnter() {
    this.props.updateUser(this.props.userId, { username: this.state.username });
    this.props.navigator.push({ name: 'phone' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Select a Username</Text>
        <TextInput
          style={styles.input}
          value={this.state.username}
          onChangeText={this.onType}
        />
        <Button text="Enter" onPress={this.onEnter} />
      </View>
    );
  }
}

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

function mapStateToProps(state) {
  const user = state.get('user');
  return { userId: user.get('id') };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (id, data) => {
      dispatch(updateUser(id, data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Username);
