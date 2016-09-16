'use strict';
var React = require('react');
var ReactNative = require('react-native');
var Camera = require('./App/modules/test/camera.js');

var JFBSample = React.createClass({
    render() {
        return(
            <Camera/>
        );
    }
});

ReactNative.AppRegistry.registerComponent('JFBSample', () => JFBSample);
