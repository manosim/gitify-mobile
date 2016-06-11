import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars

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

export default class GithubView extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  goBack() {
    this.refs.browser.goBack();
  }

  goForward() {
    this.refs.browser.goForward();
  }

  reload() {
    this.refs.browser.reload();
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref="browser"
          source={{uri: this.props.url}}
          automaticallyAdjustContentInsets={true}
          startInLoadingState={true} />

        <View style={styles.toolbar}>
          <View style={styles.toolbarLeft}>
            <ButtonBrowser icon="chevron-left" onPress={() => this.goBack()} />
            <ButtonBrowser icon="chevron-right" onPress={() => this.goForward()} />
          </View>

          <View style={styles.toolbarRight}>
            <ButtonBrowser icon="refresh" onPress={() => this.reload()} />
          </View>
        </View>
      </View>
    );
  }
};
