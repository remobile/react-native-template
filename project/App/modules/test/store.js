'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    AsyncStorage,
} = ReactNative;

var Button = require('@remobile/react-native-simple-button');
module.exports = React.createClass({
    statics: {
        title: '查看存储',
        leftButton: {handler: ()=>{app.scene.goBack()}},
    },
    componentWillMount() {
        app.toggleNavigationBar(true);
    },
    goBack() {
        app.toggleNavigationBar(false);
        app.navigator.pop();
    },
    doShowList() {
        (async function(){
            var list = await AsyncStorage.getAllKeys();
            for (var i in list) {
                var obj = await AsyncStorage.getItem(list[i]);
                console.log(list[i], JSON.parse(obj));
            }
        })();
    },
    doShowKeys() {
        (async function(){
            var list = await AsyncStorage.getAllKeys();
            console.log('result:', list);
        })();
    },
    doClearItem() {
        (async function(){
            await AsyncStorage.removeItem('mediaRecordeFiles');
        })();
    },
    doClearAll() {
        (async function(){
            var list = await AsyncStorage.getAllKeys();
            for (var i in list) {
                await AsyncStorage.removeItem(list[i]);
            }
        })();
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.doShowList}>列表</Button>
                <Button onPress={this.doShowKeys}>键值</Button>
                <Button onPress={this.doClearItem}>清除个例</Button>
                <Button onPress={this.doClearAll}>清除所有</Button>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        paddingVertical: 150,
    },
});
