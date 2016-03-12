import React from 'react-native';
import Video from 'react-native-video';
const { View, StyleSheet } = React;

const vid = '/Users/griffin/Documents/HackReactor/Thesis/Quilt/app/spaceboundd.mp4';

const WatchVideo = () => {
  return (
    <View>
      <Video source={{uri: vid}} style={styles.backgroundVideo} />
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default WatchVideo;
