'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Image,
} = ReactNative;

import ImageZoom from './imageZoom';

module.exports = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <ImageZoom cropWidth={Dimensions.get('window').width}
                           cropHeight={Dimensions.get('window').height}
                           imageWidth={200}
                           imageHeight={200}>
                    <Image style={{width:200, height:200}}
                           source={{uri:'http://v1.qzone.cc/avatar/201407/07/00/24/53b9782c444ca987.jpg!200x200.jpg'}}/>
                </ImageZoom>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
