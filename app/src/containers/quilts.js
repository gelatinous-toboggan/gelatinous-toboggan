/* eslint-disable no-use-before-define */
import React, { Component } from 'react-native';
import QuiltEntry from '../components/quilt_entry';
import { connect } from 'react-redux';
import Immutable from 'immutable'; // just for testing

const {
  PropTypes,
  StyleSheet,
  View,
} = React;

class ShowQuilts extends Component {
  onQuiltClick(quilt, navigator) {
    
  }

  render() {
    // need to add key to these quilt entries
    return (
      <View style={styles.container}>
        {this.props.quilts.map((quilt) =>
          <QuiltEntry
            navigator={this.props.navigator}
          />)
        }
      </View>
    );
  }
}

ShowQuilts.propTypes = {
  onPress: PropTypes.func,
  quilts: PropTypes.object,
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


const mapStateToProps = (state) => {
  // const quilts = state.get('quilts');
  const testQuilts = Immutable.List.of(1, 2, 3, 4, 5, 6);
  return { quilts: testQuilts };
};

export default connect(mapStateToProps)(ShowQuilts);
