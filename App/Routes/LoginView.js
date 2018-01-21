import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from '../Components/Button';
import Constants from '../Utils/Constants';
import Routes from '../Navigation/Routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 125,
    height: 125
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  }
});

export default class LoginView extends React.Component {
  doOAuth() {
    const authUrl = [
      'https://github.com/login/oauth/authorize',
      '?client_id=' + Constants.oAuthOptions.client_id,
      '&client_secret=' + Constants.oAuthOptions.client_secret,
      '&scope=' + Constants.oAuthOptions.scopes
    ].join('');

    const route = Routes.OAuth({authUrl});
    this.props.navigator.push(route);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginWrapper}>
          <Image style={styles.logo} source={require('../../images/logo.png')} />
          <Text style={styles.text}>Gitify Mobile</Text>
          <Text style={styles.description}>GitHub Notifications{'\n'} in your pocket</Text>
          <Button text="Login with GitHub" onPress={() => this.doOAuth()} />
        </View>
      </View>
    );
  }
};
