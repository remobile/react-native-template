'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
} = ReactNative;

var Panel = require('@remobile/react-native-3d-panel');
var Menu = require('../../person/Settings');
var Login = require('../../login/Login');

module.exports = React.createClass({
    render() {
        const menu = (
            <Menu />
        );
        return (
            <Panel leftMenu={menu}>
                <Login />
            </Panel>
        )
    }
});

var styles = StyleSheet.create({
    image: {
        width: sr.w,
        height: sr.h,
    },
});
