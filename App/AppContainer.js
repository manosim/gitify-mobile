import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import {
  Navigator,
  StyleSheet
} from 'react-native';

import Constants from './Utils/Constants';
import NavigationBar from './Navigation/NavigationBar';
import SceneContainer from './Navigation/SceneContainer';
import RouteMapper from './Navigation/RouteMapper';
import Routes from './Navigation/Routes';

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: Constants.NAVBAR_BG,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

class AppContainer extends Component {
  renderScene(route, navigator) {
    return (
      <SceneContainer
        title={route.title}
        route={route}
        navigator={navigator}
        onBack={() => {
          if (route.index > 0) {
            navigator.pop();
          }
        }}
        {...this.props} />
    );
  }

  _getInitialRoute() {
    if (this.props.isLoggedIn) {
      return Routes.Notifications();
    }
    return Routes.LoginView();
  }

  render() {
    const initialRoute = this._getInitialRoute();

    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={this.renderScene}
        navigationBar={<NavigationBar style={styles.navbar} routeMapper={RouteMapper} />} />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.get('token') !== null
  };
};

export default connect(mapStateToProps, null) (AppContainer);
