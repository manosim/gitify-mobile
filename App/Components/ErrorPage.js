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
  containerWrapper: {
    flex: 1,
  },
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

export default class ErrorPage extends Component {
  static propTypes = {
    onReload: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const emoji = _.sample(Constants.ERROR_EMOJIS);
    const hint = _.sample(Constants.HINTS);

    return (
      <View style={styles.containerWrapper}
        contentContainerStyle={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Oops something went wrong.</Text>
          <Text style={styles.subheading}>Couldn't get your notifications.</Text>
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
