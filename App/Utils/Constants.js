import { Platform } from 'react-native';

export default {
  STORAGE_KEY: 'gitify-mobile',

  oAuthOptions: {
    client_id: '8a99ca115f5d52d21ec4',
    client_secret: '258527033a19eec16c91bec2bce503d286be15a1',
    scopes: ['user:email', 'notifications']
  },

  WEBSITE_URL: 'http://www.gitify.io/',
  REPO_URL: 'https://github.com/ekonstantinidis/gitify-mobile',

  BRAND_SUCCESS: '#5EBA7D',
  BRAND_DANGER: '#B93936',

  THEME_PRIMARY: '#3F3F3F',
  THEME_PRIMARY_ACTIVE: '#000000',
  THEME_ALT: '#BFBFBF',
  THEME_ALT_ACTIVE: '#7F7F7F',

  BG_COLOR: '#F5FCFF',
  TOOLBAR_BG: '#555',
  REPO_TITLE_BG: '#EEE',

  NAVBAR_BG: '#333',
  NAVBAR_HEIGHT: (Platform.OS === 'ios' ? 64 : 56),
  NAVBAR_BUTTON_ICON_SIZE: 32,
  BASE_BORDER_RADIUS: 5,

  // Awesome all read messages
  ALLREAD_MESSAGES: [
    'Wow! You did it.',
    'That\'s amazing!',
    'Yes! All read.',
    'All gone! Nice work!',
    'Yay! Good news.',
  ],

  ALLREAD_EMOJIS: [
    '😉', '🎉', '🐯', '🙈',
    '🎈', '🎊', '👏', '🎪'
  ],

  HINTS: [
    'Gitify is also avaible on OSX. Both desktop & mobile apps are 100% open-source!',
    'You can just "Pull To Refresh" when you are in the notifications page.',
    'Want to view notifications only for things you participate? Try the settings page!',
    'There is a setting for playing a sound when you get a new notification - even on refresh.'
  ],

  ERROR_EMOJIS: [
    ':pensive:',
    ':disappointed:',
    ':triumph:',
    ':scream:',
    ':cry:'
  ]
};
