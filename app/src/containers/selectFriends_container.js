  /* eslint-disable
react/prefer-stateless-function,
no-use-before-define,
react/jsx-no-bind,
react/prop-types
*/
import React, { Component } from 'react-native';
import FriendEntry from '../components/friend_entry';
import { connect } from 'react-redux';
import Immutable from 'immutable'; // just for testing
import { fetchFriends } from '../actions/index';

const {
  ListView,
  PropTypes,
  StyleSheet,
  Text,
} = React;

// todo: consider factoring out view rendering into own component
class FriendsContainer extends Component {
  constructor(props) {
    super(props);
    this.getDataSource = this.getDataSource.bind(this);
    this.onCheckboxCheck = this.onCheckboxCheck.bind(this);
    this.onCheckboxUncheck = this.onCheckboxUncheck.bind(this);
    this.onRenderRow = this.onRenderRow.bind(this);
    props.fetchFriends({ username: 'tasio' });
    this.checkedFriends = {};
  }

  onCheckboxCheck(id) {
    this.checkedFriends[id.toString()] = id;
    // log array of checked user id's
    const checkedIds = [];
    for (const key in this.checkedFriends) {
      if (Number.isInteger(this.checkedFriends[key])) {
        checkedIds.push(this.checkedFriends[key]);
      }
    }
  }

  onCheckboxUncheck(id) {
    this.checkedFriends[id.toString()] = '';
    // log array of checked user id's
    const checkedIds = [];
    for (const key in this.checkedFriends) {
      if (Number.isInteger(this.checkedFriends[key])) {
        checkedIds.push(this.checkedFriends[key]);
      }
    }
  }

  onSubmitClick(quiltId, navigator) {
    // route to video camera not yet implemented
    navigator.push('video');
  }

  onRenderRow(rowData) {
    return (
      <FriendEntry
        user={rowData}
        onCheckboxCheck={this.onCheckboxCheck}
        onCheckboxUncheck={this.onCheckboxUncheck}
        key={rowData.id}
      />
    );
  }

  getDataSource() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !Immutable.is(r1, r2) });
    return ds.cloneWithRows(this.props.friends.get('friendsList').toArray());
  }

  render() {
    if (this.props.friends.get('isFetching')) {
      return <Text>Loading Friends...</Text>;
    }
    return (
      <ListView
        style={styles.container}
        dataSource={this.getDataSource()}
        renderRow={this.onRenderRow}
      />
    );
  }
}

FriendsContainer.propTypes = {
  onPress: PropTypes.func,
  // quilts: PropTypes.object,
  friends: PropTypes.object,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  const friends = state.get('friends');
  // const testUsers = Immutable.List.of('griffin', 'tasio', 'joe', 'sally');
  return { friends };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchFriends: (data) => {
      dispatch(fetchFriends(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
