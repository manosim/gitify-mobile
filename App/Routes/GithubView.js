import React from 'react';
import PropTypes from 'prop-types';

import ButtonBrowser from '../Components/ButtonBrowser';
import Constants from '../Utils/Constants';

import {
  StyleSheet,
  View,
  WebView,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Constants.TOOLBAR_BG,
  },
  toolbarLeft: {
    flex: .5,
    flexDirection: 'row',
    alignItems: 'center',

  },
  toolbarRight: {
    flex: .5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

export default class GithubView extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      url: props.url
    };
  }

  goBack() {
    this.webView.goBack();
  }

  goForward() {
    this.webView.goForward();
  }

  reload() {
    this.webView.reload();
  }

  onNavigationStateChange(navState) {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref={el => {
            this.webView = el;
          }}
          source={{uri: this.state.url}}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          automaticallyAdjustContentInsets
          startInLoadingState
        />

        <View style={styles.toolbar}>
          <View style={styles.toolbarLeft}>
            <ButtonBrowser
              icon="chevron-left"
              onPress={() => this.goBack()}
              disabled={!this.state.backButtonEnabled}
            />
            <ButtonBrowser
              icon="chevron-right"
              onPress={() => this.goForward()}
              disabled={!this.state.forwardButtonEnabled}
            />
          </View>

          <View style={styles.toolbarRight}>
            <ButtonBrowser icon="refresh" onPress={() => this.reload()} />
          </View>
        </View>
      </View>
    );
  }
}
