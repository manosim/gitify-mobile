import _ from 'underscore';
import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Constants from '../Utils/Constants';

import {
  StyleSheet,
  Text,
  RefreshControl,
  ScrollView,
  View
} from 'react-native';

var styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  noItemsWrapper: {
    alignItems: 'center',
  },
  noItemsText: {
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 5,
  },
  noItemsTextSub: {
    fontSize: 18
  },
  noItemsEmoji: {
    fontSize: 44,
  }
});

export default class AllRead extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const message = _.sample(Constants.ALLREAD_MESSAGES);
    const emoji = _.sample(Constants.ALLREAD_EMOJIS);

    return (
      <ScrollView
        style={styles.containerWrapper}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isReFetching}
            onRefresh={() => this.props.onPull(true)} />
        }>
        <View style={styles.noItemsWrapper}>
          <Text style={styles.noItemsText}>{message}</Text>
          <Text style={styles.noItemsTextSub}>No new notifications.</Text>
          <Text style={styles.noItemsEmoji}>{emoji}</Text>
        </View>
      </ScrollView>
    );
  };

};
