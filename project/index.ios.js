'use strict';
var React = require('react');
var ReactNative = require('react-native');
var App = require('./App/index.js');

var JFBSample = React.createClass({
    render() {
        return(
            <App />
        );
    }
});

ReactNative.AppRegistry.registerComponent('JFBSample', () => JFBSample);
