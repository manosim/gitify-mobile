import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import {
  Alert,
  StyleSheet,
  WebView,
  View
} from 'react-native';

import { fetchToken } from '../Actions';
import Constants from '../Utils/Constants';
import Loading from '../Components/Loading';
import Routes from '../Navigation/Routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class OAuthView extends Component {
  static propTypes = {
    authUrl: PropTypes.string.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.get('token')) {
      this.props.navigator.resetTo(Routes.Notifications());
    }
  }

  requestGithubToken(code) {
    const data = {
      client_id: Constants.oAuthOptions.client_id,
      client_secret: Constants.oAuthOptions.client_secret,
      code: code
    };

    this.props.fetchToken(data);
  }

  onNavigationStateChange(args) {
    var url = args.url;
    var raw_code = /code=([^&]*)/.exec(url) || null;
    var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    var error = /\?error=(.+)$/.exec(url);

    // If there is a code, proceed to get token from github
    if (code) {
      this.requestGithubToken(code);
    }

    if (error) {
      Alert.alert('Gitify', 'Oops! Something went wrong and we couldn\'t log' +
        'you in. Please try again.');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          style={styles.container}
          source={{uri: this.props.authUrl}}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          automaticallyAdjustContentInsets={true}
          startInLoadingState={true} />
        <Loading isLoading={this.props.auth.get('isFetching')} text="Authentication" />
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { fetchToken })(OAuthView);
