import React from "react-native";
import Login from '../components/login';
import Home from '../components/home';

const {
  Component,
  Navigator,
  StyleSheet,
  Text,
  View,
} = React;

const ROUTES = {
  login: Login,
  home: Home,
}

class App extends Component {
  renderScene(route, navigator) {
    const Component = ROUTES[route.name]; // ROUTES['signin'] => Signin
    return <Component route={route} navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'login'}}
        renderScene={this.renderScene}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}
        />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App;
