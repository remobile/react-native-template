const React = require('react');const ReactNative = require('react-native');

const {
    StyleSheet,
    View,
} = ReactNative;

module.exports = React.createClass({
    getDefaultProps () {
        return {
            progress: 0,
        };
    },
    render () {
        const fillWidth = this.props.progress * this.props.style.width;
        return (
            <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
                <View style={[styles.fill, this.props.fillStyle, { width: fillWidth }]} />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#bbbbbb',
        height: 5,
        overflow: 'hidden',
    },
    fill: {
        backgroundColor: '#3b5998',
        height: 5,
    },
});
