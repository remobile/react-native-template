'use strict';

var React = require('react');
var ReactNative = require('react-native');
var LoginPanel = require('./LoginPanel.js');
var RegisterPanel = require('./RegisterPanel.js');

var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} = ReactNative;

module.exports = React.createClass({
    changeTab(tabIndex) {
        this.setState({tabIndex});
    },
    getInitialState() {
        return {
            phone: '',
            tabIndex: 0,
        };
    },
    componentDidMount() {
        app.toggleNavigationBar(true);
    },
    changeToLoginPanel(phone) {
        this.setState({tabIndex: 0, phone});
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.tabContainer, {borderColor: app.THEME_COLOR}]}>
                    <TouchableOpacity
                        onPress={this.changeTab.bind(null, 0)}
                        style={[styles.tabButton, this.state.tabIndex===0?{backgroundColor:app.THEME_COLOR}:null]}>
                        <Text style={[styles.tabText, this.state.tabIndex===0?{color:'#FFFFFF'}:null]} >已有账号</Text>
                        {this.state.tabIndex===0&&<View style={[styles.makeup, {backgroundColor:app.THEME_COLOR, right:0}]}></View>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.changeTab.bind(null, 1)}
                        style={[styles.tabButton, this.state.tabIndex===1?{backgroundColor:app.THEME_COLOR}:null]}>
                        <Text style={[styles.tabText, this.state.tabIndex===1?{color:'#FFFFFF'}:null]} >手机注册</Text>
                        {this.state.tabIndex===1&&<View style={[styles.makeup, {backgroundColor:app.THEME_COLOR, left:0}]}></View>}
                    </TouchableOpacity>
                </View>
                {this.state.tabIndex===0 ? <LoginPanel phone={this.state.phone}/> : <RegisterPanel changeToLoginPanel={this.changeToLoginPanel}/>}
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    tabContainer: {
        height: 50,
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    tabButton: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 10,
    },
    tabText: {
        fontSize: 18,
    },
    makeup: {
        top: 0,
        width: 10,
        height: 50,
        position: 'absolute'
    },
});
