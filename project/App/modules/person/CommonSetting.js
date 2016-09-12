'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    Switch,
    View,
    Text,
} = ReactNative;

module.exports = React.createClass({
    statics: {
        title: '基础设置',
    },
    getInitialState() {
        return {
            onlyWifiUpload: !!app.setting.data.onlyWifiUpload,
        };
    },
    onValueChange(value) {
        this.setState({onlyWifiUpload: value});
        app.setting.setOnlyWifiUpload(value);
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.title}>只在wifi下上传</Text>
                    <Switch
                        style={styles.switch}
                        onValueChange={this.onValueChange}
                        value={this.state.onlyWifiUpload} />
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingVertical: 20,
    },
    row: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        height: 80,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    title: {
        flex: 7,
        fontSize: 17,
        color: 'gray',
        marginLeft: 2,
    },
    switch: {
        flex: 2,
    }
});
