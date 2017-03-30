'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
    AsyncStorage,
    ListView,
} = ReactNative;

const Button = require('@remobile/react-native-simple-button');
module.exports = React.createClass({
    statics: {
        title: '查看存储',
    },
    getInitialState () {
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            dataSource: this.ds.cloneWithRows([]),
        };
    },
    doShowList () {
        (async () => {
            const list = [];
            const keys = await AsyncStorage.getAllKeys();
            for (let key of keys) {
                const obj = await AsyncStorage.getItem(key);
                console.log(key, JSON.parse(obj));
                list.push(key + ': ' + obj);
            }
            this.setState({ dataSource: this.ds.cloneWithRows(list) });
        })();
    },
    doShowKeys () {
        let list = [];
        (async () => {
            const keys = await AsyncStorage.getAllKeys();
            console.log(keys);
            list = keys;
            this.setState({ dataSource: this.ds.cloneWithRows(list) });
        })();
    },
    doClearItem () {
        (async () => {
            await AsyncStorage.removeItem('mediaRecordeFiles');
        })();
    },
    doClearAll () {
        (async () => {
            const list = await AsyncStorage.getAllKeys();
            for (let i in list) {
                await AsyncStorage.removeItem(list[i]);
            }
        })();
    },
    renderRow (text, sectionID, rowID) {
        return (
            <Text style={styles.itemText} key={rowID}>
                {text}
            </Text>
        );
    },
    renderSeparator (sectionID, rowID) {
        return (
            <View style={styles.separator} key={rowID} />
        );
    },
    render () {
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
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    keyboardShouldPersistTaps
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    />
            </View>
        );
    },
});

const styles = StyleSheet.create({
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
