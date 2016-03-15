/* eslint-disable no-use-before-define */
import React from 'react-native';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs';
import { connect } from 'react-redux';
import { postQuilt } from '../actions/index';

const {
  Component,
  Dimensions,
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

    // refactor into redux?
    this.state = {
      isCapturing: false,
    }
  }

  // testing video posting, should be moved into action creator in future
  // also, add spinners,
  // add catches

  _onStartCapture() {
    console.log('start capturing');
    this.setState({
      isCapturing: true,
    });
    this.camera.capture().then((file) => {
      return RNFS.readFile(file, 'base64');
    }).then((data) => {
      this.postQuilt(Object.assign(this.props.currentQuilt, {
        vid: data,
      }));
      // return fetch('https://thawing-ravine-43717.herokuapp.com/api/quilt', {
      //   method: 'POST',
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     img: data,
      //   }),
      // })
      // .then(res => console.log(res));
    });
  }

  _onStopCapture() {
    console.log('stop capturing');
    this.setState({
      isCapturing: false,
    });
    this.camera.stopCapture()
  }


  onCapturePress() {
    if (!this.state.isCapturing) {
      this._onStartCapture();
    } else {
      this._onStopCapture();
    }
  }

  cameraRef(cam) {
    // not sure the reason for this function yet
    this.camera = cam;
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
        >
          <Text style={styles.capture} onPress={this.onCapturePress}>
            [CAPTURE]
          </Text>
        </Camera>
      </View>
    );
  }
}

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
function mapStateToProps (state) {
  const currentQuilt = state.get('currentQuilt');
  return {
    currentQuilt: currentQuilt.toObject(),
  };
}

// dispatch postQuilt with previous current quilt state plus video data
function mapDispatchToProps (dispatch) {
  return {
    postQuilt: (data) => {
      dispatch(postQuilt(data));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ShowCamera);
