import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from '../Components/Button';
import Constants from '../Utils/Constants';
import NotificationsList from '../Components/Notifications';
import Routes from '../Navigation/Routes';

var styles = StyleSheet.create({
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

class Dashboard extends Component {
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
    const isLoggedIn = this.props.auth.get('token') !== null;

    return (
      <View style={styles.container}>

        {isLoggedIn ? (
          <NotificationsList />
        ) : (
        <View style={styles.loginWrapper}>
          <Image style={styles.logo} source={require('../../images/logo.png')} />
          <Text style={styles.text}>Gitify Mobile</Text>
          <Text style={styles.description}>GitHub Notifications{'\n'} in your pocket</Text>
          <Button text="Login with GitHub" onPress={() => this.doOAuth()} />
        </View>
        )}
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
