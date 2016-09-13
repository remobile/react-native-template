'use strict';
var React = require('react');var ReactNative = require('react-native');
var {
    Image,
    StyleSheet,
    Text,
    View,
} = ReactNative;


module.exports = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container1}>
                    <Text style={styles.title}>温馨提示</Text>
                    <Text style={styles.actualContent}>正在开发中，敬情期待...</Text>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    container1: {
        width:sr.w*5/6,
        height:100,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#54C1E7',
        borderRadius:10,
    },
    title: {
        color: 'red',
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
        overflow: 'hidden',
    },
    actualContent: {
        marginVertical:10,
        color: 'white',
        fontSize: 18,
        fontWeight: '100',
        overflow: 'hidden',
        textAlign:'center',
    },
});
