import Sound from 'react-native-sound';

export default {
  play() {
    const audioFile = new Sound('digi.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.warn('Failed to load the sound: ', error);
      } else {
        audioFile.play();
      }
    });
  }
};
