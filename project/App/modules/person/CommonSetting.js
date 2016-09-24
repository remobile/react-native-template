'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    Switch,
    View,
    Text,
    TouchableOpacity,
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
    selectThemeColor(color) {
        app.setting.setThemeColor(color);
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
                <View style={styles.row}>
                    <Text style={styles.title}>主题颜色</Text>
                    <View style={styles.colorContainer}>
                        {
                            CONSTANTS.THEME_COLORS.map((color, i)=> {
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={this.selectThemeColor.bind(null, color)}
                                        style={[styles.color, {backgroundColor: color}]}
                                        />
                                )
                            })
                        }
                    </View>
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
    },
    colorContainer: {
        flex: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    color: {
        flex: 1,
        height:80,
        marginRight: 10,
    },
});
