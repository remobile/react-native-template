'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    Image,
    View,
} = ReactNative;

const DImage = React.createClass({
    getInitialState () {
        return { showDefault: true };
    },
    onLoad () {
        this.setState({ showDefault: false });
    },
    componentWillReceiveProps (nextProps) {
        const pre = this.props.source, post = nextProps.source;
        const preuri = pre.uri, posturi = post.uri;
        const preT = typeof posturi === 'string', postT = typeof posturi === 'string';
        if ((!(preT ^ postT)) && preuri !== posturi) {
            this.setState({ showDefault: true });
        }
    },
    render () {
        const { source, defaultSource, ...other } = this.props;
        const { showDefault } = this.state;
        return (
            showDefault ?
                <View>
                    <Image source={defaultSource} {...other}>{this.props.children}</Image>
                    <Image style={{ left:-1, top:-1, position:'absolute', width:1, height:1 }} source={source} onLoad={this.onLoad} />
                </View>
            :
                <Image source={source} {...other} >{this.props.children}</Image>
        );
    },
});

module.exports = DImage;
