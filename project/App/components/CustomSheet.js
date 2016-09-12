'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    TouchableOpacity,
    View,
} = ReactNative;

var Overlay = require('./ActionSheet/overlay.js');
var Sheet = require('./ActionSheet/sheet.js');

module.exports =  React.createClass({
    render() {
        return (
            <Overlay visible={this.props.visible}>
                <View style={styles.actionSheetContainer}>
                    <TouchableOpacity
                        style={{flex:1}}
                        onPress={this.props.onCancel}>
                    </TouchableOpacity>
                    <Sheet visible={this.props.visible}>
                        {this.props.children}
                    </Sheet>
                </View>
            </Overlay>
        );
    },
});

var styles = StyleSheet.create({
    actionSheetContainer: {
        flex: 1,
        padding: 10,
        paddingBottom: 6,
        justifyContent: "flex-end",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
