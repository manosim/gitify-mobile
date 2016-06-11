import LoginView from '../Routes/LoginView';
import SettingsView from '../Routes/SettingsView';
import NotificationsView from '../Routes/Notifications';
import OAuthView from '../Routes/OAuthView';
import GithubView from '../Routes/GithubView';

export default {
  LoginView() {
    return {
      id: 'login-view',
      title: 'Login',
      component: LoginView,
      displayNavBar: false
    };
  },

  Notifications(props) {
    return {
      id: 'notifications-view',
      title: 'Notifications',
      component: NotificationsView,
      passProps: props,
      displayNavBar: true
    };
  },

  OAuth(props) {
    return {
      id: 'oauth-view',
      title: 'Authentication',
      component: OAuthView,
      passProps: props,
      displayNavBar: true
    };
  },

  SettingsView(props) {
    return {
      id: 'settings-view',
      title: 'Settings',
      component: SettingsView,
      passProps: props,
      displayNavBar: true
    };
  },

  GithubView(props) {
    return {
      id: 'github-view',
      title: 'GitHub',
      component: GithubView,
      passProps: props,
      displayNavBar: true
    };
  },
};
