'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    Platform,
    screenPhysicalPixels,
    Dimensions,
    UIManager,
    TextInput,
    Keyboard,
    ScrollView,
    TouchableOpacity,
    PanResponder,
} = ReactNative;

var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');

module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
    },
    getInitialState() {
        // this.text = '0123456789abcdefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ';
        this.text = '`~!@#$%^&*()_+-={}[]|\\:;"\'<>,.?/';
        return {
            fontSize: 12,
        };
    },
    showLog() {
        var a = this.log;
        var keys = _.keys(a["14"]);
        var list = {};
        for (var f in a) {
            var item = a[f];
            for (var k in item) {
                if (!list[k]) {
                    list[k] = [];
                }
                list[k].push(item[k]/f);
            }
        }
        var scale = {};
        for (var k in list) {
            scale[k] = Math.round(_.sum(list[k])/list[k].length*100)/100;
        }
        var res = {};
        this.text.split('').forEach((k)=>{
            res[k] = scale[k];
        });
        console.log(JSON.stringify(res));
    },
    onLayout(key, e) {
        const {fontSize} = this.state;
        if (!this.log) {
            this.log = {};
        }
        if (!this.log[fontSize]) {
            this.log[fontSize] = {};
        }
        this.log[fontSize][key] = e.nativeEvent.layout.width;
        this.log[fontSize]['height'] = e.nativeEvent.layout.height;
    },
    doTest() {
        this.log = {};
        var id = setInterval(()=>{
            const {fontSize} = this.state;
            console.log("====2", fontSize);
            this.setState({fontSize: fontSize+3});
            if (fontSize>=80) {
                Toast('done');
                clearInterval(id);
            }
        }, 1000);
    },
    render() {
        const {assistText, inputHeight} = this.state;
        const {keyboardType} = this.props;
        return (
            <View style={styles.container}>
                <Button onPress={this.doTest}>测试</Button>
                <Button onPress={this.showLog}>结果</Button>
                <View style={{flexDirection:'row'}}>
                    {
                    this.text.split('')
                    .map((n, i)=><Text key={i} style={{backgroundColor:'red', fontSize:this.state.fontSize}} onLayout={this.onLayout.bind(null, n)}>{n}</Text>)
                    }
                </View>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
