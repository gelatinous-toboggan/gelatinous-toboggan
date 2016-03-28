/* eslint-disable no-use-before-define */
import React from 'react-native';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import { reviewQuilt } from '../actions/index';
import Button from '../components/button';

const {
  Component,
  Dimensions,
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

class ShowCamera extends Component {
  constructor(props) {
    super(props);
    this.cameraRef = this.cameraRef.bind(this);
    this._onStartCapture = this._onStartCapture.bind(this);
    this._onStopCapture = this._onStopCapture.bind(this);
    this.onCapturePress = this.onCapturePress.bind(this);
    this.reverseCamera = this.reverseCamera.bind(this);

    // refactor into redux?
    this.state = {
      isCapturing: false,
      type: 'back',
    };
  }

  // testing video posting, should be moved into action creator in future
  // also, add spinners,
  // add catches
  onCapturePress() {
    if (!this.state.isCapturing) {
      this._onStartCapture();
    } else {
      this._onStopCapture();
    }
  }

  _onStartCapture() {
    this.setState({
      isCapturing: true,
    });

    this.camera.capture()
      .then(file => {
        this.props.reviewQuilt(file);
        this.props.navigator.replace({ name: 'video' });
      });
  }

  _onStopCapture() {
    this.setState({
      isCapturing: false,
    });
    this.camera.stopCapture();
  }

  cameraRef(cam) {
    // not sure the reason for this function yet
    this.camera = cam;
  }

  reverseCamera() {
    this.setState({ type: this.state.type === 'back' ? 'front' : 'back' });
  }
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={this.cameraRef}
          style={styles.preview}
          aspect={'fill'}
          captureTarget={Camera.constants.CaptureTarget.temp}
          captureMode={Camera.constants.CaptureMode.video}
          captureQuality={Camera.constants.CaptureQuality.medium}
          type={this.state.type}
        >
          <Text style={styles.capture} onPress={this.onCapturePress}>
            [CAPTURE]
          </Text>
          <Button text="SELFIE!" onPress={this.reverseCamera} />
        </Camera>
      </View>
    );
  }

}

ShowCamera.propTypes = {
  navigator: PropTypes.object,
  reviewQuilt: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
});

// get the state of the current quilt
// which will be passed with the video
// to action creator to post data
function mapStateToProps(state) {
  const currentQuilt = state.get('currentQuilt').toObject();
  // currentQuilt.users = currentQuilt.users.toArray();
  const creator = state.get('user');

  return {
    currentQuilt,
    creator: {
      id: creator.get('id'),
      username: creator.get('username'),
    },
    token: creator.get('token'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reviewQuilt: (file) => {
      dispatch(reviewQuilt(file));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCamera);
