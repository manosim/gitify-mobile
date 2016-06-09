import LoginView from '../Routes/LoginView';
import SetUpView from '../Routes/SetUpView';
import NotificationsView from '../Routes/Notifications';
import OAuthView from '../Routes/OAuth';

export default {

  SetUpView() {
    return {
      id: 'setup-view',
      title: 'Setting Up',
      component: SetUpView,
      displayNavBar: false
    };
  },

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

};
