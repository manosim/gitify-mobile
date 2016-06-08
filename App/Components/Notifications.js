import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import immutable from 'immutable';

import { fetchNotifications } from '../Actions';
import Loading from './Loading';

import {
  ListView,
  View,
  StyleSheet,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export class NotificationsList extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !immutable.is(r1, r2)
    });

    this.state = {
      notificationsSource: ds.cloneWithRows([])
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications !== this.props.notifications) {
      this.setState({
        notificationsSource: this.state.notificationsSource.cloneWithRows(nextProps.notifications)
      });
    }
  }

  componentDidMount() {
    this.props.fetchNotifications();
  }

  _renderRow(rowData) {
    console.log(rowData);
    return (
      <View>
        <Text>{rowData}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listContainer}
          enableEmptySections={true}
          dataSource={this.state.notificationsSource}
          renderRow={this._renderRow.bind(this)} />

        <Loading isLoading={this.props.isFetching} />
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    isFetching: state.notifications.get('isFetching'),
    notifications: state.notifications.get('response', [])
  };
};

export default connect(mapStateToProps, { fetchNotifications })(NotificationsList);
