'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
} = ReactNative;

const Panel = require('@remobile/react-native-3d-panel');
const Menu = require('../../person/Settings');
const Login = require('../../login/Login');

module.exports = React.createClass({
    render () {
        const menu = (
            <Menu />
        );
        return (
            <Panel leftMenu={menu}>
                <Login />
            </Panel>
        );
    },
});

const styles = StyleSheet.create({
    image: {
        width: sr.w,
        height: sr.h,
    },
});
