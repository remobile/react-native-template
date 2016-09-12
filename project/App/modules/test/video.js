'use strict';

import {
  AlertIOS,
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Video from '@remobile/react-native-video';
var SplashScreen = require('@remobile/react-native-splashscreen');

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'stretch',
    duration: 0.0,
    currentTime: 0.0,
    paused: true,
  };

  componentWillMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={styles.container}>
          <Video
            source={{uri: 'http://192.168.1.119:3000/video/test.m3u8'}}
            style={styles.videoNormalFrame}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onEnd={() => { AlertIOS.alert('Done!') }}
            repeat={true}
          />
      </View>
    );
  }
}
module.exports = VideoPlayer;

var NORMAL_WIDTH = sr.w;
var NORMAL_HEIGHT = NORMAL_WIDTH*2/3;
var FULL_WIDTH = sr.h;
var FULL_HEIGHT = sr.w;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoNormalFrame: {
      position: 'absolute',
      top:0,
      left: 0,
      width: NORMAL_WIDTH,
      height: NORMAL_HEIGHT,
  },
});
