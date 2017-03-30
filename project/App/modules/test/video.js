'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    AlertIOS,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} = ReactNative;

import Video from '@remobile/react-native-video';
const SplashScreen = require('@remobile/react-native-splashscreen');

class VideoPlayer extends React.Component {
    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'stretch',
        duration: 0.0,
        currentTime: 0.0,
        paused: false,
    };

    componentWillMount () {
        SplashScreen.hide();
    }

    render () {
        return (
            <View style={styles.container}>
                <Video
                    source={{ uri: 'http://192.168.0.155:8088/Exhibition/download/A14151F1F13A43E3B29A5E934B0C4218.mp4' }}
                    style={styles.videoNormalFrame}
                    rate={this.state.rate}
                    paused={this.state.paused}
                    volume={this.state.volume}
                    muted={this.state.muted}
                    resizeMode={this.state.resizeMode}
                    onEnd={() => { AlertIOS.alert('Done!'); }}
                    repeat
          />
            </View>
        );
    }
}
module.exports = VideoPlayer;

const NORMAL_WIDTH = sr.w;
const NORMAL_HEIGHT = NORMAL_WIDTH * 2 / 3;
const FULL_WIDTH = sr.h;
const FULL_HEIGHT = sr.w;

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
