'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    Text,
    Animated,
    View,
    TouchableHighlight,
} = ReactNative;

var Button = require('./Button.js');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            title: '温馨提示',
            content: '确定要执行操作吗？',
            cancelText: '取消',
            confirmText: '确定',
        };
    },
    getInitialState() {
        return {
            opacity: new Animated.Value(0)
        };
    },
    doCancel() {
        this.closeModal(()=>{
            this.props.doCancel();
        });
    },
    doConfirm() {
        this.closeModal(()=>{
            this.props.doConfirm();
        });
    },
    componentDidMount() {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
        }).start();
    },
    closeModal(callback) {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 500,
        }).start(()=>{
            callback();
        });
    },
    render() {
        return (
            <Animated.View style={[styles.overlayContainer, {opacity: this.state.opacity}]}>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.redLine}>
                    </Text>
                    <Text style={styles.content}>
                        {this.props.content}
                    </Text>
                    <Text style={styles.H_Line}>
                    </Text>
                    <View style={styles.buttonViewStyle}>
                        {!!this.props.doCancel &&
                            <TouchableHighlight
                                underlayColor="rgba(0, 0, 0, 0)"
                                onPress={this.doCancel}
                                style={styles.buttonStyleContain}>
                                <Text style={styles.buttonStyle}>{this.props.cancelText}</Text>
                            </TouchableHighlight>
                        }
                        {!!this.props.doCancel &&
                            <Text style={styles.line}>
                            </Text>
                        }
                        <TouchableHighlight
                            underlayColor="rgba(0, 0, 0, 0)"
                            onPress={this.doConfirm}
                            style={styles.buttonStyleContain}>
                            <Text style={styles.buttonStyle} >{this.props.confirmText}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Animated.View>
        );
    }
});

var styles = StyleSheet.create({
    buttonViewStyle: {
        flexDirection: 'row',
        width: sr.w*5/6-20,
        height: 40,
    },
    H_Line: {
        marginTop: 10,
        width: sr.w*5/6,
        height: 1,
        backgroundColor: '#b4b4b4'
    },
    redLine: {
        marginTop: 10,
        width: sr.w-110,
        height: 1,
        backgroundColor: '#ff3c30'
    },
    line: {
        width: 1,
        height: 50,
        backgroundColor: '#b4b4b4'
    },
    buttonStyleContain: {
        height: 50,
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonStyle: {
        fontSize: 15,
        color: '#000000'
    },
    container: {
        width:sr.w*5/6,
        height:sr.h/4,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFFFF',
        borderRadius:10,
    },
    title: {
        color: '#ff3c30',
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
        overflow: 'hidden',
    },
    content: {
        alignSelf:'center',
        color:'#000000',
        margin: 20,
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
