import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Alert,
  StyleSheet,
  WebView,
  View
} from 'react-native';

import { fetchToken } from '../Actions';
import Constants from '../Utils/Constants';
import ErrorPage from '../Components/ErrorPage';
import Loading from '../Components/Loading';
import Routes from '../Navigation/Routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class OAuthView extends React.Component {
  static propTypes = {
    authUrl: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      url: props.authUrl
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.get('token')) {
      this.props.navigator.resetTo(Routes.Notifications());
    }
  }

  reload() {
    this.setState({
      url: this.props.authUrl
    });
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
    const url = args.url;
    const raw_code = /code=([^&]*)/.exec(url) || null;
    const code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    const error = /\?error=(.+)$/.exec(url);

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
    if (this.props.auth.get('isFetching') || this.props.auth.get('token')) {
      return <Loading isLoading={true} text="Authentication" />;
    }

    if (this.props.auth.get('errored')) {
      return <ErrorPage
        subheading="Couldn't authenticate with GitHub."
        onReload={() => this.reload()} />;
    }

    return (
      <View style={styles.container}>
        <WebView
          style={styles.container}
          source={{uri: this.state.url}}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          automaticallyAdjustContentInsets={true}
          startInLoadingState={true} />
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
