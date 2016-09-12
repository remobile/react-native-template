'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    WebView,
    Animated,
    Navigator,
} = ReactNative;

var Button = require('./Button.js');
var sr = require('../config/Screen.js');

module.exports = React.createClass({
    getInitialState() {
        return {
            opacity: new Animated.Value(0)
        };
    },
    componentDidMount() {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
        }).start();
    },
    closeModal() {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 500,
        }).start(()=>{
            app.closeModal();
        });
    },
    render() {
        return (
            <Animated.View style={[styles.overlayContainer, {opacity: this.state.opacity}]}>
                <View style={[styles.container, {top: Navigator.NavigationBar.Styles.General.TotalNavHeight+sr.statusBarHeight}]}>
                    <WebView
                        style={styles.webview}
                        srouce={{uri:this.props.webAddress}}
                        scalesPageToFit={true}
                        />
                    <Button
                        onPress={this.closeModal}
                        style={styles.contentButton}>返回</Button>
                </View>
            </Animated.View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        width:sr.w*5/6,
        height:sr.h*4/5,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius:10,
        position: 'absolute',
        left: sr.w*1/12,
    },
    webview: {
        width:sr.w*5/6,
        height:sr.h*4/5-50,
    },
    contentButton: {
        width:sr.w*5/6,
        height:50,
        borderRadius:0,
        backgroundColor: CONSTANTS.THEME_COLOR,
    },
    overlayContainer: {
        position:'absolute',
        bottom: 0,
        alignItems:'center',
        justifyContent: 'center',
        width:sr.w,
        height:sr.h,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },

});
