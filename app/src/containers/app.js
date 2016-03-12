/* eslint-disable no-use-before-define */
import React from 'react-native';
import Login from '../components/login';
import Home from '../components/home';

const {
  Component,
  Navigator,
  StyleSheet,
} = React;

const ROUTES = {
  login: Login,
  home: Home,
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
