import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import immutable from 'immutable';

import { fetchNotifications } from '../Actions';
import Loading from '../Components/Loading';

import {
  ListView,
  Text,
  RefreshControl,
  StyleSheet,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class NotificationsView extends Component {

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

  componentWillMount() {
    this.props.fetchNotifications(false);
  }

  _renderRow(rowData) {
    return (
      <View>
        <Text>{rowData.id}</Text>
        <Text>{rowData.repository.full_name}</Text>
        <Text>{rowData.subject.title}</Text>
        <Text>------------</Text>
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
          renderRow={this._renderRow.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isReFetching}
              onRefresh={() => this.props.fetchNotifications(true)} />
          } />
        <Loading isLoading={this.props.isFetching} />
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    isFetching: state.notifications.get('isFetching'),
    isReFetching: state.notifications.get('isReFetching'),
    notifications: state.notifications.get('response', [])
  };
};

export default connect(mapStateToProps, { fetchNotifications })(NotificationsView);
