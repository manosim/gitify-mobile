import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import {
  Navigator,
  StyleSheet,
  Text
} from 'react-native';

import Constants from './Utils/Constants';
import NavigationBar from './Navigation/NavigationBar';
import SceneContainer from './Navigation/SceneContainer';
import SettingUp from './Components/SettingUp';
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

  constructor(props) {
    super(props);
    this.state = {
      time: Date.now()
    };
  }

  componentWillMount() {
    const self = this;
    setTimeout(function() {
      console.log('HSUSUSU');
      self.setState({
        time: Date.now()
      });
    }, 1000);
  }

  render() {
    // let hasLoaded = false;

    // const handleChange = () => {
    //   hasLoaded = store.getState().settings.get('loaded', false) !== false;
    //   console.log(hasLoaded);
    // };
    // let unsubscribe = store.subscribe(handleChange);
    // handleChange();

    if (!this.props.loaded) {
      return <SettingUp />;
    }

    const initialRoute = this._getInitialRoute();
    // unsubscribe();

    console.log(this.props);

    // return <Text>{this.state.time} --- {`${this.props.loaded}`}</Text>;

    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={this.renderScene}
        navigationBar={<NavigationBar style={styles.navbar} routeMapper={RouteMapper} />} />
    );
  }
};

function mapStateToProps(state) {
  return {
    loaded: state.settings.get('loaded', false),
    isLoggedIn: state.auth.get('token') !== null
  };
};

export default connect(mapStateToProps, null)(AppContainer);
