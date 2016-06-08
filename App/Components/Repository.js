import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars

import Constants from '../Utils/Constants';
import Notification from './Notification';

import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {

  },
  titleBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Constants.REPO_TITLE_BG,
    alignItems: 'center'
  },
  avatar: {
    width: 25,
    height: 25,
    marginLeft: 15,
    borderRadius: 15
  },
  title: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default class Repository extends Component {

  static propTypes = {
    details: PropTypes.object.isRequired
  };

  render() {
    const details = this.props.details;
    const avatar_url = details.notifications[0].repository.owner.avatar_url || null;

    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Image style={styles.avatar} source={{uri: avatar_url}} />
          <Text style={styles.title} numberOfLines={1}>{details.repository}</Text>
        </View>
        {details.notifications.map((notification) => {
          return <Notification key={notification.id} details={notification} />;
        })}
      </View>
    );
  };

};
