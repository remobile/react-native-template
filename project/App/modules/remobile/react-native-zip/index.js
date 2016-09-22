var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Image,
} = ReactNative;

var Zip = require('@remobile/react-native-zip');
var Button = require('@remobile/react-native-simple-button');

module.exports = React.createClass({
    testUnzip() {
        if (app.isandroid) {
            Zip.unzip('/sdcard/1/jsandroid.zip', '/sdcard/1/', (z)=>{console.log(z)}, (z)=>{console.log(z)})
        } else {
            Zip.unzip('/Users/fang/rn/react-native-template/localServer/public/jsandroid.zip', '/Users/fang/rn/react-native-template/localServer/public/', (z)=>{console.log(z)}, (z)=>{console.log(z)})
        }
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.testUnzip}>
                    test unzip
                </Button>
            </View>
        );
    },
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});
