const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Image,
} = ReactNative;

const Zip = require('@remobile/react-native-zip');
const Button = require('@remobile/react-native-simple-button');

module.exports = React.createClass({
    testUnzip () {
        if (app.isandroid) {
            Zip.unzip('/sdcard/1/jsandroid.zip', '/sdcard/1/', (z) => { console.log(z); }, (z) => { console.log(z); });
        } else {
            Zip.unzip('/Users/fang/rn/react-native-template/localServer/public/jsandroid.zip', '/Users/fang/rn/react-native-template/localServer/public/', (z) => { console.log(z); }, (z) => { console.log(z); });
        }
    },
    render () {
        return (
            <View style={styles.container}>
                <Button onPress={this.testUnzip}>
                    test unzip
                </Button>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});
