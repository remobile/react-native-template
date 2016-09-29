'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} = ReactNative;

var SplashScreen = require('@remobile/react-native-splashscreen');
var {ScoreSelect} = COMPONENTS;

module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
    },
    getInitialState() {
        return {
            index: 0,
        };
    },
    afterChange(index) {
        this.setState({index});
    },
    render() {
        const {index} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.swiperContainer}>
                    <ScoreSelect
                        width={sr.tw/3}
                        height={sr.ws(100)}
                        afterChange={this.afterChange}
                        >
                        {
                            [6, 7, 8, 9, 10].map((n, i)=>{
                                return (
                                    <View style={styles.itemContainer} key={i}>
                                        <View style={index==i?styles.selectedScoreContainer:styles.scoreContainer}>
                                            <Text style={index==i?styles.selectedScore:styles.score}>{n}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScoreSelect>
                </View>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    swiperContainer: {
        width: sr.w,
        height: 100,
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedScoreContainer: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#A62045',
        borderWidth: 2,
        borderRadius: 100,
    },
    score: {
        fontSize: 30,
        color: '#A62045',
    },
    selectedScore: {
        fontSize: 40,
        color: 'black',
    },
});
