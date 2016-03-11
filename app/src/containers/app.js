import React from "react-native";

const {
  View,
  Text,
  StyleSheet
} = React;

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>MyText</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default App;
