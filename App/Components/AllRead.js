import _ from 'underscore';
import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Constants from '../Utils/Constants';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 1,
  },
  footerWrapper: {
    padding: 20
  },
  heading: {
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 5,
  },
  subheading: {
    fontSize: 18
  },
  emoji: {
    fontSize: 44,
  },
  hintTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 50,
    marginBottom: 10,
    textAlign: 'center'
  },
  hint: {
    marginHorizontal: 30,
    fontSize: 13,
    textAlign: 'center'
  }
});

export default class AllRead extends Component {
  static propTypes = {
    onReload: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const message = _.sample(Constants.ALLREAD_MESSAGES);
    const emoji = _.sample(Constants.ALLREAD_EMOJIS);
    const hint = _.sample(Constants.HINTS);

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.heading}>{message}</Text>
          <Text style={styles.subheading}>No new notifications.</Text>
          <Text style={styles.emoji}>{emoji}</Text>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.onReload()}>
            <Text>Reload</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.footerWrapper}>
          <Text style={styles.hintTitle}>Hint</Text>
          <Text style={styles.hint}>{hint}</Text>
        </View>
      </View>
    );
  };

};
