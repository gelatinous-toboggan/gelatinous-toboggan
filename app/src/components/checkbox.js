/* eslint-disable no-use-before-define */

// Source: https://github.com/sconxu/react-native-checkbox

import React, { Component } from 'react-native';

const {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
  PropTypes,
} = React;

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.render = this.render.bind(this);
    this.state = {
      check: this.props.checked,
    };
  }

  onChange() {
    this.setState({ check: !this.state.check });
    if (this.state.check) {
      this.props.onCheck(this.props.id);
    } else {
      this.props.onCheck(this.props.id);
    }
  }

  render() {
    let source = require('../assets/cb_disabled.png');

    if (this.state.check) {
      source = require('../assets/cb_enabled.png');
    }

    let container = (
      <View style={styles.container}>
        <Image
          style={styles.checkbox}
          source={source}
        />
        <View style={styles.labelContainer}>
          <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
        </View>
      </View>
    );

    if (this.props.labelBefore) {
      container = (
        <View style={styles.container}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
          </View>
          <Image
            style={styles.checkbox}
            source={source}
          />
        </View>
      );
    }

    return (
      <TouchableHighlight onPress={this.onChange} underlayColor="white">
        {container}
      </TouchableHighlight>
    );
  }
}

CheckBox.propTypes = {
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.number,
  labelBefore: PropTypes.string,
  onCheck: PropTypes.func,
};

CheckBox.getDefaultProps = {
  label: 'Label',
  labelBefore: false,
  checked: false,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 26,
    height: 26,
  },
  labelContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  label: {
    fontSize: 15,
    lineHeight: 15,
    color: 'grey',
  },
});

export default CheckBox;
