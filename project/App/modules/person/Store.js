'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    AsyncStorage,
    ListView,
} = ReactNative;

var Button = require('@remobile/react-native-simple-button');
module.exports = React.createClass({
    statics: {
        title: '查看存储',
    },
    getInitialState() {
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: this.ds.cloneWithRows([]),
        };
    },
    doShowList() {
        (async ()=>{
            var list = [];
            var keys = await AsyncStorage.getAllKeys();
            for (var key of keys) {
                var obj = await AsyncStorage.getItem(key);
                console.log(key, JSON.parse(obj));
                list.push(key+': '+obj);
            }
            this.setState({dataSource: this.ds.cloneWithRows(list)});
        })();
    },
    doShowKeys() {
        var list = [];
        (async ()=>{
            var keys = await AsyncStorage.getAllKeys();
            console.log(keys);
            list = keys;
            this.setState({dataSource: this.ds.cloneWithRows(list)});
        })();
    },
    doClearItem() {
        (async ()=>{
            await AsyncStorage.removeItem('mediaRecordeFiles');
        })();
    },
    doClearAll() {
        (async ()=>{
            var list = await AsyncStorage.getAllKeys();
            for (var i in list) {
                await AsyncStorage.removeItem(list[i]);
            }
        })();
    },
    renderRow(text, sectionID, rowID) {
        return (
            <Text style={styles.itemText} key={rowID}>
              {text}
            </Text>
        )
    },
    renderSeparator(sectionID, rowID) {
        return (
            <View style={styles.separator} key={rowID}/>
        );
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button onPress={this.doShowList}>列表</Button>
                    <Button onPress={this.doShowKeys}>键值</Button>
                    <Button onPress={this.doClearItem}>清除个例</Button>
                    <Button onPress={this.doClearAll}>清除所有</Button>
                </View>
                <ListView
                    initialListSize={1}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    keyboardShouldPersistTaps={true}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    />
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemText: {
        fontSize: 16,
        marginVertical:10,
    },
    separator: {
      backgroundColor: '#DDDDDD',
      height: 1,
    },
});
