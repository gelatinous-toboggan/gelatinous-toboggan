/* eslint-disable no-use-before-define */
import React, { Component } from 'react-native';
import FriendEntry from '../components/friend_entry';
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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => Immutable.is(r1, r2)});
    return ds.cloneWithRows(this.props.friends.toArray());
  }

  onSubmitClick(quiltId, navigator) {
    //route to video camera not yet implemented
    navigator.push('video')
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.getDataSource()}
        renderRow={(rowData) => <FriendEntry username={rowData} />}
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

const mapStateToProps = (state) => {
  // const users = state.get('users');
  const testUsers = Immutable.List.of('griffin', 'tasio', 'joe', 'sally');
  return { friends: testUsers };
};

const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps)(ShowQuilts);
