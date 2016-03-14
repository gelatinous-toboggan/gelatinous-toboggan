/* eslint-disable no-use-before-define */
import React from 'react-native';
import Camera from 'react-native-camera';

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
    this.takePicture = this.takePicture.bind(this);
    this.cameraRef = this.cameraRef.bind(this);
  }

  takePicture() {
    this.camera.capture()
      .then(data => console.log(data))
      .catch(err => console.error(err));
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
        >
          <Text style={styles.capture} onPress={this.takePicture}>
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

export default ShowCamera;
