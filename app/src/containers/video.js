/* eslint-disable no-use-before-define */
import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import { postQuilt, addToQuilt } from '../actions/index';
import Button from '../components/button';
import RNFS from 'react-native-fs';
import ip from '../config';

const {
  View,
  StyleSheet,
  PropTypes,
} = React;

class WatchVideo extends Component {
  constructor(props) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
    this.onReject = this.onReject.bind(this);

    if (this.props.currentQuilt.status !== 'create') {
      this.url = `http://${ip}:8000/api/quilt/${this.props.currentQuilt.id}?token=${this.props.token}`;
    } else {
      this.url = this.props.currentQuilt.file;
    }
  }

  onAccept() {
    if (this.props.currentQuilt.status !== 'watch') {
      this._sendVideo();
    } else {
      this._replayVideo();
    }
  }

  onReject() {
    if (this.props.currentQuilt.status !== 'watch') {
      this.props.navigator.replace({ name: 'camera' });
    } else {
      this.props.navigator.pop();
    }
  }

  _sendVideo() {
    RNFS.readFile(this.props.currentQuilt.file, 'base64')
      .then((data) => {
        if (this.props.currentQuilt.status === 'create') {
          this.props.postQuilt(Object.assign(this.props.currentQuilt, {
            creator: this.props.creator,
            video: data,
            token: this.props.token,
          }));
        } else {
          this.props.addToQuilt({
            quiltId: this.props.currentQuilt.id,
            creator: this.props.creator,
            video: data,
            token: this.props.token,
          });
        }
        this.props.navigator.replace({ name: 'home' });
      });
  }

  _replayVideo() {
    this.refs.video.seek(0);
  }

  render() {
    const acceptText = this.props.currentQuilt.status === 'watch' ? 'Replay' : 'Accept';
    const rejectText = this.props.currentQuilt.status === 'watch' ? 'Back' : 'Reject';
    const repeat = this.props.currentQuilt.status !== 'watch';
    return (
      <View style={styles.container}>
        <Video
          ref="video"
          source={{ uri: this.url }}
          style={styles.backgroundVideo}
          repeat={repeat}
          onEnd={this.onEnd}
        />
        <Button onPress={this.onAccept} text={acceptText} />
        <Button onPress={this.onReject} text={rejectText} />
      </View>
    );
  }
}

WatchVideo.propTypes = {
  addToQuilt: PropTypes.func,
  currentQuilt: PropTypes.object,
  creator: PropTypes.object,
  navigator: PropTypes.object,
  postQuilt: PropTypes.func,
  watchQuiltId: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

function mapStateToProps(state) {
  const user = state.get('user');

  return {
    currentQuilt: state.get('currentQuilt').toObject(),
    creator: {
      id: user.get('id'),
      username: user.get('username'),
    },
    token: user.get('token'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postQuilt: (data) => {
      dispatch(postQuilt(data));
    },
    addToQuilt: (data) => {
      dispatch(addToQuilt(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchVideo);
