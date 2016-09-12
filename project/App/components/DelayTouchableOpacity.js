'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    TouchableOpacity,
} = ReactNative;

var TimerMixin = require('react-timer-mixin');

module.exports = React.createClass({
    mixins: [TimerMixin],
    componentWillMount() {
        this.enable = true;
        this.onPress = (e) =>{
            if (this.enable) {
                this.enable = false;
                this.props.onPress(e);
                this.setTimeout(()=>{this.enable=true}, this.props.delayTime||1000);
            }
        };
    },
    render() {
        return (
            <TouchableOpacity
                {...this.props}
                delayPressOut={this.props.delayTime||1000}
                onPress={this.onPress}
                >
                {this.props.children}
            </TouchableOpacity>
        )
    }
});
