import React from 'react';
import {
  StyleSheet,
  Button,
  Image,
  Text,
  ImageBackground,
  View
} from 'react-native';

export default class App extends React.Component {
  press() {
    alert('Hey... Whats Up!')
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/reem.jpg')} style={{ width: 100, height: 100 }} />

        < Button title="explore Me!" onPress={this.press} />
        <View>
          <ImageBackground source={
            require('./assets/bg.jpg')
          }
            style={
              {
                width: 300,
                height: 300
              }
            }>
            <Text> Inside </Text>
            <Text > Hello world. </Text>
          </ImageBackground>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
