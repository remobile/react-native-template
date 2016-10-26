'use strict';

var React = require('react');var ReactNative = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    Navigator,
    RefreshControl,
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
        var timeID = setInterval(()=>{
            var progress = this.state.progress + 0.01;
            if (progress >= 1) {
                clearInterval(timeID);
            }
            this.setState({progress});
        }, 100);
    },
    render() {
        return (
            <View style={styles.container}>
                <Progress.Circle
                    progress={this.state.progress}
                    size={80}
                    borderWidth={5}
                    borderColor="#239fdb"
                    textStyle={{color:'black', fontSize: 40, fontWeight:'10', alignSelf:'center'}}
                    showsText={true}
                    formatText={(p)=>{
                        p = Math.floor(p*10);
                        return 10-p;
                    }}
                    color='black' />
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
