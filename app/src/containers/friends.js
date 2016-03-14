/* eslint-disable react/prefer-stateless-function, no-use-before-define */
import React, { Component } from 'react-native';
import FriendEntry from '../components/friend_entry';
import { connect } from 'react-redux';
import Immutable from 'immutable'; // just for testing

const {
  ListView,
  PropTypes,
  StyleSheet,
} = React;

// todo: consider factoring out view rendering into own component
class ShowQuilts extends Component {
  constructor(props) {
    super(props);
    this.getDataSource = this.getDataSource.bind(this);
  }

  onSubmitClick(quiltId, navigator) {
    // route to video camera not yet implemented
    navigator.push('video');
  }

  onRenderRow(rowData) {
    return <FriendEntry username={rowData} />;
  }

  getDataSource() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => Immutable.is(r1, r2) });
    return ds.cloneWithRows(this.props.friends.toArray());
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.getDataSource()}
        renderRow={this.onRenderRow}
      />
    );
  }
}

ShowQuilts.propTypes = {
  onPress: PropTypes.func,
  quilts: PropTypes.object,
  friends: PropTypes.object,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (/* state */) => {
  // const users = state.get('users');
  const testUsers = Immutable.List.of('griffin', 'tasio', 'joe', 'sally');
  return { friends: testUsers };
};

// const mapDispatchToProps = (dispatch) => {
// }

export default connect(mapStateToProps)(ShowQuilts);
