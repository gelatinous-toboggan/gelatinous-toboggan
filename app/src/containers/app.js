/* eslint-disable no-use-before-define */
import React from 'react-native';
import LoginContainer from '../containers/login_container';
import Home from '../components/home';
import CreateQuilt from '../components/create_quilt';
// todo: create seperate component/container for quilts
import ShowQuilts from '../containers/quilts';
import ShowCamera from '../components/camera';
import WatchVideo from '../components/video';
import FriendsContainer from '../containers/friends';
import NavigationBar from 'react-native-navbar';

const {
  Component,
  Navigator,
  StatusBarIOS,
  StyleSheet,
  Text,
  View,
} = React;

// todo: refactor into redux-based navigation system
const ROUTES = {
  login: LoginContainer,
  home: Home,
  create: CreateQuilt,
  camera: ShowCamera,
  view: ShowQuilts,
  video: WatchVideo,
  friends: FriendsContainer,
};

class App extends Component {
  renderScene(route, navigator) {
    const NextComponent = ROUTES[route.name];
    return <NextComponent route={route} navigator={navigator} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar statusBar={{hidden:true}} title={{title: 'Quilt'}}/>
        <Navigator
          initialRoute={{ name: 'login' }}
          renderScene={this.renderScene}
          configureScene={() => Navigator.SceneConfigs.FloatFromRight}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  navBar: {
    backgroundColor: 'green',
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default App;
