'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Animated,
    Navigator,
} = ReactNative;

module.exports = React.createClass({
    getDefaultProps() {
        return {
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        };
    },
    getInitialState() {
        return {
            opacity: new Animated.Value(0),
        };
    },
    componentDidMount() {
        Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 500,
            }
        ).start();
    },
    closeModal() {
        Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 500,
            }
        ).start(()=>{
            app.closeModal();
        });
    },
    render() {
        return (
            <Animated.View style={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
                {
                    !!this.props.title &&
                    <View style={[styles.title, {backgroundColor:app.THEME_COLOR, height:Navigator.NavigationBar.Styles.General.TotalNavHeight}]}>
                        <View style={[styles.titleContainer, {marginTop: Navigator.NavigationBar.Styles.General.StatusBarHeight}]}>
                            <Text style={styles.titleText}>
                                {this.props.title}
                            </Text>
                        </View>
                    </View>
                }
                {this.props.children}
            </Animated.View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    title: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '500',
    }
});
