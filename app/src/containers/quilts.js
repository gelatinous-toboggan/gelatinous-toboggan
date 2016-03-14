/* eslint-disable no-use-before-define */
import React, { Component } from 'react-native';
import QuiltEntry from '../components/quilt_entry';
import { connect } from 'react-redux';
import Immutable from 'immutable'; // just for testing

const {
  ActivityIndicatorIOS,
  ListView,
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

// todo: consider factoring out view rendering into own component
class ShowQuilts extends Component {
  constructor(props) {
    super(props);
    this.getDataSource = this.getDataSource.bind(this);
  }

  getDataSource() {
    console.log('test');
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.props.quilts);
  }

  onQuiltClick(quiltId, navigator) {
    //route to specific video not yet implemented
    navigator.push('video')
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.getDataSource()}
        renderRow={(rowData) => <QuiltEntry username={rowData} />}
      >
      </ListView>
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
  },
});

// get quilts from state
// todo: fetch quilts from server
const mapStateToProps = (state) => {
  // const quilts = state.get('quilts');
  const testQuilts = Immutable.List.of(1, 2, 3, 4, 5, 6);
  return { quilts: [1,2,3,4,5,6] };
};

// todo: set currently watched quilt in state?
const mapDispatchToProps = () => {

};

export default connect(mapStateToProps)(ShowQuilts);
