'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    KeyboardAvoidingView,
    Modal,
    SegmentedControlIOS,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    ScrollView,
} = ReactNative;

var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');

module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
        app.toggleNavigationBar(true);
    },
    render() {
        return (
            <KeyboardAvoidingView behavior={'position'} style={styles.container} keyboardVerticalOffset={100}>

                    <View style={styles.upContainer}>
                        <Text>
                            fang
                        </Text>
                    </View>
                <TextInput style={styles.textInput} placeholder="1"/>
                <TextInput style={styles.textInput} placeholder="1"/>
            </KeyboardAvoidingView>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingTop: 1,
        backgroundColor: 'blue',
        overflow: 'hidden',
    },
    upContainer: {
        height: sr.h-200,
        backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        borderRadius: 5,
        borderWidth: 1,
        height: 44,
        paddingHorizontal: 10,
    },
});
