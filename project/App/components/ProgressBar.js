var React = require('react');var ReactNative = require('react-native');

var {
    StyleSheet,
    View
} = ReactNative;

module.exports =  React.createClass({
    getDefaultProps() {
        return {
            progress: 0,
        };
    },
    render() {
        var fillWidth = this.props.progress*this.props.style.width;
        return (
            <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
                <View style={[styles.fill, this.props.fillStyle, { width: fillWidth }]}/>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    background: {
        backgroundColor: '#bbbbbb',
        height: 5,
        overflow: 'hidden'
    },
    fill: {
        backgroundColor: '#3b5998',
        height: 5
    }
});
