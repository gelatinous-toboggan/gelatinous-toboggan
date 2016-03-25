/* eslint-disable
no-use-before-define,
react/prefer-stateless-function */

import React from 'react-native';
import LoginContainer from '../containers/login_container';
import Home from '../components/home';
import CreateQuilt from '../components/create_quilt';
import SelectFriendsContainer from '../containers/selectFriends_container';
// todo: create seperate component/container for quilts
import ShowQuilts from './quilts';
import ShowCamera from './camera';
import WatchVideo from './video';
import FriendsContainer from './friends';
import LoginOrSignup from './login_or_signup';
import PhoneNumber from './phoneNumber';
import Username from './username';
import ContactsContainer from './contacts';
// import NavigationBar from 'react-native-navbar';

const {
  Component,
  Navigator,
  View,
} = React;

// todo: refactor into redux-based navigation system
const ROUTES = {
  camera: ShowCamera,
  contacts: ContactsContainer,
  create: CreateQuilt,
  friends: FriendsContainer,
  home: Home,
  login: LoginContainer,
  loginOrSignup: LoginOrSignup,
  phone: PhoneNumber,
  username: Username,
  view: ShowQuilts,
  video: WatchVideo,
  friends: FriendsContainer,
  selectFriends: SelectFriendsContainer,
};

class App extends Component {
  configScene() {
    return Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    const NextComponent = ROUTES[route.name];
    return <NextComponent route={route} navigator={navigator} />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          initialRoute={{ name: 'loginOrSignup' }}
          renderScene={this.renderScene}
          configureScene={this.configScene}
        />
      </View>
    );
  }
}

export default App;
