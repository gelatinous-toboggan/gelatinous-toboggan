/* eslint-disable no-use-before-define */
import React from 'react-native';
import LoginContainer from '../containers/login_container';
import Home from '../components/home';
import CreateQuilt from '../components/create_quilt';
// todo: create seperate component/container for quilts
import ShowQuilts from '../containers/quilts';
import ShowCamera from '../components/camera';
import WatchVideo from '../components/video';

const {
  Component,
  Navigator,
  StyleSheet,
} = React;

const ROUTES = {
  login: LoginContainer,
  home: Home,
  create: CreateQuilt,
  camera: ShowCamera,
  view: ShowQuilts,
  video: WatchVideo
};

class App extends Component {
  renderScene(route, navigator) {
    const NextComponent = ROUTES[route.name]; // ROUTES['signin'] => Signin
    return <NextComponent route={route} navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ name: 'login' }}
        renderScene={this.renderScene}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
