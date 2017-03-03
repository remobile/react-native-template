'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    Text,
    View,
    TouchableOpacity,
    NativeModules,
    Dimensions,
} = ReactNative;

var width = Dimensions.get('window').width;
var Toast = require('@remobile/react-native-toast').show;
var Module = require('@remobile/react-native-module');

var SimpleApp = React.createClass({
    goBack() {
        Module.unload({text: 'I come back'});
    },
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'transparent', width:width}}>
                <View style={{flex:1,  backgroundColor: 'gray', justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Text style={{color:'white', fontSize:25}}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,  backgroundColor: 'blue'}}>
                    <Text>
                        {JSON.stringify(this.props)}
                    </Text>
                </View>
            </View>
        )
    }
});

ReactNative.AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
