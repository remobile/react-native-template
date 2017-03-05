'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    View,
    Image,
    Dimensions,
    ActivityIndicator,
} = ReactNative;
const _ = require('lodash');
const html = require('./tpl.html');
const WebView = require('react-native-webview-bridge');
const windowWidth = Dimensions.get('window').width;

module.exports = React.createClass({
    getDefaultProps() {
        return {
            width: windowWidth,
            height: 400,
        };
    },
    componentWillReceiveProps(nextProps) {
        // if(!_.isEqual(nextProps.option, this.props.option)) {
            this.refs.chart.reload();
        // }
    },
    getOption(obj) {
        const escape = `-=remobile=-`;
        return JSON.stringify(obj, function(key, val) {
            if (typeof val === 'function') {
                return `${escape}${val}${escape}`;
            }
            return val;
        }).replace(`"${escape}`, '').replace(`${escape}"`, '').replace(/\\n/g, '');
    },
    getInjectedJavaScript() {
        const {width, height, option} = this.props;
        return `
        document.body.style.height = "${height}px";
        document.body.style.width = "${width}px";
        var chart = echarts.init(document.body);
        chart.setOption(${this.getOption({...option, animation: false})});
        WebViewBridge.send(chart.getDataURL());
        `;
    },
    getInitialState: function() {
        return {
            source: null
        };
    },
    onBridgeMessage(message) {
        this.setState({source: {uri: message}});
    },
    render() {
        const {width, height} = this.props;
        const {source} = this.state;
        const script = this.getInjectedJavaScript();
        return (
            <View>
                <View style={{width, height, alignItems:'center', justifyContent: 'center'}}>
                    {
                        source?
                        <Image style={{width, height}} source={source} resizeMode='stretch'/>
                        :
                        <ActivityIndicator />
                    }
                </View>
                <WebView
                    ref="chart"
                    scrollEnabled={false}
                    scalesPageToFit={true}
                    onBridgeMessage={this.onBridgeMessage}
                    javaScriptEnabled={true}
                    injectedJavaScript={script}
                    style={{position:'absolute', width, height,left: -windowWidth*2}}
                    source={html}
                    />
            </View>
        );
    },
});
