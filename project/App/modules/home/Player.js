'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    AppState,
    ActivityIndicatorIOS,
    ProgressBarAndroid,
} = ReactNative;

var TimerMixin = require('react-timer-mixin');
import Video from '@remobile/react-native-video';
var UtilsModule = require('NativeModules').UtilsModule;

module.exports = React.createClass({
    mixins: [TimerMixin],
    getInitialState() {
        this.lock(false);
        return {
            paused: false,
            indicator: true,
        };
    },
    lock(paused) {
        if (app.isandroid) {
            if (paused) {
                UtilsModule.unlockScreen();
            } else {
                UtilsModule.lockScreen();
            }
        }
    },
    _handleAppStateChange(currentAppState) {
        if (currentAppState === 'background') {
            this.oldpaused = this.state.paused;
            this.setState({paused: true});
            this.lock(this.state.paused);
        } else if (currentAppState === 'active') {
            if (!this.oldpaused) {
                this.setState({paused: false});
                this.lock(this.state.paused);;
            }
        }
    },
    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    },
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        this.lock(true);
    },
    onVideoLoad(e) {
        this.setState({ indicator: false});
    },
    togglePlayVideo() {
        this.setState({paused: !this.state.paused});
        this.lock(this.state.paused);
    },
    getSpinner() {
        if (app.isandroid) {
            return (
                <ProgressBarAndroid
                    style={{height: 50}}
                    styleAttr="Inverse"
                    />
            );
        } else {
            return (
                <ActivityIndicatorIOS
                    animating={true}
                    size="large"
                    />
            );
        }
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.videoNormalFrameLayer}/>
                <Video
                    ref='video'
                    source={{uri: this.props.uri}}
                    rate={1.0}
                    volume={1.0}
                    muted={false}
                    paused={this.state.paused}
                    resizeMode="stretch"
                    repeat={true}
                    onLoad={this.onVideoLoad}
                    onError={this.videoError}
                    style={styles.videoNormalFrame}
                    />
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.togglePlayVideo}
                    style={styles.controlNormalFrame}
                    >
                    {this.state.paused &&
                        <TouchableOpacity
                            style={styles.video_icon_container}
                            onPress={this.togglePlayVideo}>
                            <Image
                                resizeMode='stretch'
                                source={app.img.task_play}
                                style={styles.video_icon}>
                            </Image>
                        </TouchableOpacity>
                    }
                </TouchableOpacity>
                {
                    this.state.indicator &&
                    <View style={styles.controlNormalFrame}>
                        {this.getSpinner()}
                    </View>
                }
            </View>
        );
    }
});



var NORMAL_WIDTH = sr.w;
var NORMAL_HEIGHT = NORMAL_WIDTH*2/3;
var FULL_WIDTH = sr.h;
var FULL_HEIGHT = sr.w;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ececec',
        marginTop:-10,
    },
    videoNormalFrameLayer: {
        width: NORMAL_WIDTH,
        height: (193/330*NORMAL_WIDTH)-39,
    },
    videoNormalFrame: {
        position: 'absolute',
        top:0,
        left: 27,
        right:27,
        width: NORMAL_WIDTH-52,
        height: 193/330*(NORMAL_WIDTH-52),
        transform:[{rotate:'0deg'}],
    },
    controlNormalFrame: {
        position: 'absolute',
        top: 0,
        left: 26,
        width: NORMAL_WIDTH-52,
        height: 193/330*(NORMAL_WIDTH-52),
        alignItems:'center',
        justifyContent: 'center',
    },
    video_icon_container: {
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems:'center',
    },
    video_icon: {
        height: 40,
        width: 40,
    },

});
