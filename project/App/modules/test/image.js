'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Image,
} = ReactNative;

var Button = require('@remobile/react-native-simple-button');
var SplashScreen = require('@remobile/react-native-splashscreen');


var DImage =  React.createClass({
    getInitialState() {
        return {showDefault: true}
    },
    onLoad() {
        this.setState({showDefault: false});
    },
    componentWillReceiveProps(nextProps) {
        var pre = this.props.source, post = nextProps.source;
        var preuri = pre.uri, posturi = post.uri;
        var preT = typeof posturi === 'string', postT = typeof posturi === 'string';
        if ((!(preT^postT)) && preuri !== posturi) {
            this.setState({showDefault: true});
        }
    },
    render() {
        var {source, defaultSource, ...other} = this.props;
        var {showDefault} = this.state;
        return (
            showDefault ?
            <Image source={defaultSource} {...other}>
                <Image
                    source={source}
                    onLoad={this.onLoad}
                    style={{width:1,height:1}}/>
            </Image>
            :
            <Image source={source} {...other} />
        )
    }
});


module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
    },
    getInitialState() {
        return {index: 1}
    },
    play() {
        var index = this.state.index+1;
        if (index > 8) index = 1;
        this.setState({index});
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.play}>播放</Button>
                <DImage
                    resizeMode='stretch'
                    defaultSource={app.img.personal_default_head}
                    source={{uri:'http://192.168.1.119:3000/images/'+this.state.index+'.png'}}
                    style={{width:100, height: 100}} />
                <DImage
                    resizeMode='stretch'
                    defaultSource={app.img.personal_default_head}
                    source={app.img.common_delete}
                    style={{width:100, height: 100}} />
                <DImage
                    resizeMode='stretch'
                    defaultSource={app.img.personal_default_head}
                    source={{uri:'http://facebook.github.io/react/img/logo_og.png'}}
                    style={{width:100, height: 100}} />
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        paddingVertical: 150,
    },
});
