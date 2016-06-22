# Gitify Mobile  [![travis][travis-image]][travis-url]

> If you are looking for the desktop version - [ekonstantinidis/gitify](https://github.com/ekonstantinidis/gitify/).


### Download
Available for **free** on iOS & Android.

 - [App Store] (https://itunes.apple.com/us/app/gitify/id1123311036?ls=1&mt=8)
 - [Google Play Store] (http://play.google.com/store/apps/details?id=com.gitify)


### Prerequisites

 - [React](https://facebook.github.io/react/)
 - [React Native](https://facebook.github.io/react-native/)
 - [NPM](https://www.npmjs.com/)


### Setup

First you will need the `react-native cli`. To install:

    npm install -g react-native-cli

Then install the project dependencies:

    npm install


### Running the project

For both platforms, first open the terminal:

    npm start

##### iOS

To run the project on **iOS** you will need *Xcode 7 and above*. For development, it is suggested to use the emulator. Finally just open the XCode Project or use the shortcut:

    ./scripts/run ios


##### Android

To run the project on **Android**, once you have downloaded the SDK, use the shortcuts:

Runs the android emulator (`android avd` to create it):

    # emu_name: Defaults to Android_6.0
    ./scripts/emulator android emu_name

Run the app on the running emulator.

    ./scripts/run android


### Test
To run the tests (`eslint`):

    npm test

[travis-image]: https://travis-ci.org/ekonstantinidis/gitify-mobile.svg?branch=master
[travis-url]: https://travis-ci.org/ekonstantinidis/gitify-mobile
