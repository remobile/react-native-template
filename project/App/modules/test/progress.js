'use strict';

var React = require('react');var ReactNative = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    Image,
} = ReactNative;

var SplashScreen = require('@remobile/react-native-splashscreen');
var Progress = require('react-native-progress');


module.exports = React.createClass({
    getInitialState() {
        return {
            progress: 0,
        };
    },
    componentDidMount() {
        SplashScreen.hide();
        setInterval(()=>{
            var progress = this.state.progress + 0.01;
            if (progress >= 1) {
                progress = 0;
            }
            this.setState({progress});
        }, 100);
    },
    render() {
        return (
            <View style={styles.container}>
                <Progress.Circle
                    progress={this.state.progress}
                    size={200}
                    unfilledColor='blue'
                    borderWidth={5}
                    borderColor="black"
                    thickness={20}
                    direction="clockwise"
                    textStyle={{color:'black', fontSize: 80, fontWeight:'800'}}
                    showsText={true}
                    formatText={(p)=>{
                        p = Math.floor(p*10);
                        return 10-p;
                    }}
                    color='red' />
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
