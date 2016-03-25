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
import Button from '../components/button';
import { inviteFriends } from '../actions/index';

const {
  ListView,
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

// todo: consider factoring out view rendering into own component
class SelectFriendsContainer extends Component {
  constructor(props) {
    super(props);
    this.getDataSource = this.getDataSource.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onRenderRow = this.onRenderRow.bind(this);
    props.fetchFriends({ username: 'tasio' });
    this.checkedFriends = {};
    this.onInvitePress = this.onInvitePress.bind(this);
  }

  onCheck(id) {
    if (this.checkedFriends[id.toString()]) {
      delete this.checkedFriends[id.toString()];
    } else {
      this.checkedFriends[id.toString()] = id;
    }
  }

  onSubmitClick(quiltId, navigator) {
    // route to video camera not yet implemented
    navigator.push('video');
  }

  onInvitePress() {
    const checkedIds = [];
    for (const key in this.checkedFriends) {
      if (this.checkedFriends.hasOwnProperty(key)) {
        checkedIds.push(this.checkedFriends[key]);
      }
    }
    this.props.inviteFriends(checkedIds);
    this.props.navigator.push({ name: 'camera' });
  }

  onRenderRow(rowData) {
    return (
        <FriendEntry
          user={rowData}
          onCheck={this.onCheck}
          checked={
            this.props.currentQuilt.get('users').toArray() ?
            this.props.currentQuilt.get('users').toArray().indexOf(rowData.id) !== -1 : false
          }
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
      <View>
        <ListView
          style={styles.container}
          dataSource={this.getDataSource()}
          renderRow={this.onRenderRow}
        />
        <Button text={'Invite!'} onPress={this.onInvitePress} />
      </View>
    );
  }
}

SelectFriendsContainer.propTypes = {
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
  const currentQuilt = state.get('currentQuilt');
  // const testUsers = Immutable.List.of('griffin', 'tasio', 'joe', 'sally');
  return { friends, currentQuilt };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchFriends: (data) => {
      dispatch(fetchFriends(data));
    },
    inviteFriends: (data) => {
      dispatch(inviteFriends(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectFriendsContainer);
