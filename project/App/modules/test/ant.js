'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Image,
    Text,
    Animated,
    Easing,
} = ReactNative;
var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');
var ClassTest = require('../specops/ClassTest');

var MarqueeLabel = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired,
    },
    getDefaultProps() {
        return {
            speed: 10,
            spaceRatio: 0.5
        };
    },
    getInitialState() {
        this.alpha = {};
        return {
            left1: new Animated.Value(0),
            left2: new Animated.Value(0),
            list: this.props.children.split(''),
        };
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.children != nextProps.children) {
            this.setState({list: nextProps.children.split('')});
        }
    },
    onLayout(i, e) {
        this.alpha[i] = e.nativeEvent.layout.width;
        if (_.size(this.alpha) === this.state.list.length) {
            this.twidth = _.sum(_.values(this.alpha));
            this.startMoveFirstLabelHead();
        }
    },
    onLayoutContainer(e) {
        this.width = e.nativeEvent.layout.width;
        this.spaceWidth = this.props.spaceRatio * this.width;
        this.setState({left2: new Animated.Value(this.width)});
    },
    startMoveFirstLabelHead() {
        const {width, twidth, props} = this;
        const {speed} = props;
        Animated.timing(this.state.left1, {
            toValue: -twidth+this.spaceWidth,
            duration: (twidth-this.spaceWidth)*speed,
            easing: Easing.linear,
            delay: 500,
        }).start(()=>{
            Animated.parallel(
                this.moveFirstLabelTail(),
                this.moveSecondLabelHead(),
            )
        });
    },
    moveFirstLabelHead() {
        const {width, twidth, props} = this;
        const {speed} = props;
        Animated.timing(this.state.left1, {
            toValue: -twidth+this.spaceWidth,
            duration: (twidth+this.spaceWidth)*speed,
            easing: Easing.linear,
        }).start(()=>{
            Animated.parallel(
                this.moveFirstLabelTail(),
                this.moveSecondLabelHead(),
            )
        });
    },
    moveFirstLabelTail() {
        const {width, twidth, props} = this;
        const {speed} = props;
        Animated.timing(this.state.left1, {
            toValue: -twidth,
            duration: this.spaceWidth*speed,
            easing: Easing.linear,
        }).start(()=>{
            this.setState({left1: new Animated.Value(width)});
        });
    },
    moveSecondLabelHead() {
        const {width, twidth, props} = this;
        const {speed} = props;
        Animated.timing(this.state.left2, {
            toValue: -twidth+this.spaceWidth,
            duration: (twidth+this.spaceWidth)*speed,
            easing: Easing.linear,
        }).start(()=>{
            Animated.parallel(
                this.moveFirstLabelHead(),
                this.moveSecondLabelTail(),
            )
        });
    },
    moveSecondLabelTail() {
        const {width, twidth, props} = this;
        const {speed} = props;
        Animated.timing(this.state.left2, {
            toValue: -twidth,
            duration: this.spaceWidth*speed,
            easing: Easing.linear,
        }).start(()=>{
            this.setState({left2: new Animated.Value(twidth)});
        });
    },
    render() {
        const {left1, left2, list} = this.state;
        return (
            <View style={{flexDirection: 'row'}} onLayout={this.onLayoutContainer}>
                <Animated.View style={[styles.textContainer, {left: left1}]}>
                    {list.map((o, i)=>(<Text key={i} onLayout={this.onLayout.bind(null, i)}>{o}</Text>))}
                </Animated.View>
                <Animated.View style={[styles.textContainer, {position: 'absolute', left: left2}]}>
                    {list.map((o, i)=>(<Text key={i}>{o}</Text>))}
                </Animated.View>
            </View>
        )
    }
});


module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
        app.toggleNavigationBar(true);
    },
    getInitialState() {
        return {
            text:  '暗示健康等会拉时间段ksajdfkasdjkfasjdkfasldfjasdlf暗示健康等会拉',
        };
    },
    taskVideo() {
        app.navigator.push({
            component: ClassTest,
            passProps: {
                videoId: '9DA36BA5AD2F4395A552BE2D89C11639',
            }
        })
        // this.setState({
        //     text:  '1231238123981273981273981273912873912873129837129837',
        // });
    },
    render() {
        return (
            <View style={styles.container}>
                {/*<MarqueeLabel>
                    {this.state.text}
                </MarqueeLabel>*/}
                <Button onPress={this.taskVideo}>测试</Button>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    button: {
        backgroundColor: 'blue',
        width: sr.w/2,
        borderWidth: 0,
    },
    textContainer: {
        flexDirection: 'row',
    },
});
