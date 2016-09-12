'use strict';

var React = require('react');var ReactNative = require('react-native');

var {
    Image,
    StyleSheet,
    Text,
    View,
} = ReactNative;

var Progress = require('react-native-progress');
var SplashScreen = require('@remobile/react-native-splashscreen');

module.exports = React.createClass({
    getDefaultProps() {
        return {
            time: 60,
        };
    },
    getInitialState() {
        return {
            progress: 1,
        };
    },
    componentDidMount() {
        SplashScreen.hide();
        var step = this.props.time*10;
        var timeID = setInterval(()=>{
            var progress = this.state.progress - 0.01;
            if (progress <= 0) {
                clearInterval(timeID);
            }
            this.setState({progress});
        }, step);
    },
    render() {
        var time = Math.floor(this.state.progress*this.props.time);
        if (time < 0) {
            time = 0;
        }
        return (
            <View style={styles.container}>
              <Text>{'时间剩余:'+time+'秒'}</Text>
              <Progress.Bar
                  progress={this.state.progress}
                  width={sr.w-100}
                  height={10}
                  borderRadius={6}
                  animated={true}
                  borderWidth={1}
                  borderColor='white'
                  color='#ff3c30'/>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
