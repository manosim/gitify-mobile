import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars

import {
  WebView,
} from 'react-native';

// import Constants from '../Utils/Constants';

export default class GithubView extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render() {
    return (
      <WebView
        source={{uri: this.props.url}}
        automaticallyAdjustContentInsets={true}
        startInLoadingState={true} />
    );
  }
};
