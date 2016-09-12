'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    TextInput,
    ScrollView,
} = ReactNative;

var Call = require('@remobile/react-native-call');
var SplashScreen = require('@remobile/react-native-splashscreen');
var Audio = require('@remobile/react-native-audio');

var Button = {COMPONENTS};

module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
    },
    getInitialState() {
        return {
            pwd: '',
        };
    },
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{width:sr.tw}}>
                {
                    _.map(new Array(4), (o, i)=>{
                        return (
                            <TextInput
                                key={i}
                                placeholder={"输入新密码"+i}
                                style={styles.txtPassWord}
                                onChangeText={(text) => this.setState({pwd: text})}
                                />
                        )
                    })
                }
                </ScrollView>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    txtPassWord: {
        height: 50,
        marginTop: 30,
        marginHorizontal: 10,
        marginVertical: 30,
        paddingLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D7D7D7',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems:'center',
    },
});
