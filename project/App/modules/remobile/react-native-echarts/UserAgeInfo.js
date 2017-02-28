'use strict';
var React = require('react');
var ReactNative = require('react-native');
var {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
} = ReactNative;

import Echarts from '@remobile/react-native-echarts';

module.exports = React.createClass({
    getInitialState() {
        return {
            data: this.props.data,
        };
    },
    render() {
        const {data} = this.state;
        const percentages = app.utils.getPercentages(data);
        const sections = [
            {name: '10岁以下', count: app.utils.toThousands(data[0]), percentage: percentages[0], color: '#008fe3'},
            {name: '10-20岁', count: app.utils.toThousands(data[1]), percentage: percentages[1], color: '#8bd6c5'},
            {name: '20-30岁', count: app.utils.toThousands(data[2]), percentage: percentages[2], color: '#00a680'},
            {name: '30-40岁', count: app.utils.toThousands(data[3]), percentage: percentages[3], color: '#008fe3'},
            {name: '40-50岁', count: app.utils.toThousands(data[4]), percentage: percentages[4], color: '#8bd6c5'},
            {name: '50-60岁', count: app.utils.toThousands(data[5]), percentage: percentages[5], color: '#00a680'},
            {name: '60-70岁', count: app.utils.toThousands(data[6]), percentage: percentages[6], color: '#008fe3'},
            {name: '70岁以上', count: app.utils.toThousands(data[7]), percentage: percentages[7], color: '#8bd6c5'},
        ];
        const option = {
            xAxis: {
                type : 'category',
                data: ["10","20","30","40","50","60","70","70+"],
                axisTick: {
                    alignWithLabel: true
                }
            },
            grid: {
                top: '5%',
                bottom: '5%',
                containLabel: true
            },
            yAxis: {
                type : 'value',
            },
            series: [{
                barWidth: '60%',
                type: 'bar',
                data,
            }]
        };
        return (
            <ScrollView>
                <Echarts option={option} height={sr.s(250)}/>
                <View style={styles.bottomView}>
                    {
                        sections.map((item, i)=>{
                            return(
                                <View key={i} style={styles.itemView}>
                                    <View style={styles.leftView}>
                                        <Text style={[styles.littleView,{marginLeft:3,width: 20}]}>{i+1}
                                        </Text>
                                        <View style={[styles.squirView,{backgroundColor: item.color}]}/>
                                        <Text style={styles.littleView}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <Text style={styles.littleView}>
                                        {item.percentage}
                                    </Text>
                                    <Text style={[styles.littleView,{marginRight: 39}]}>
                                        {item.count}
                                    </Text>
                                    <View style={styles.lineView}/>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.blankView} />
            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({
    bottomView: {
        width: sr.w,
    },
    blankView: {
        width: sr.w,
        height: 100,
    },
    itemView: {
        height: 37,
        width: sr.w,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftView: {
        height: 37,
        marginLeft: 39,
        flexDirection: 'row',
        alignItems: 'center',
    },
    squirView: {
        height: 25,
        width: 25,
        marginRight: 10,
    },
    littleView: {
        fontSize: 12,
        color: '#888888',
    },
    lineView: {
        position: 'absolute',
        height: 1,
        width: sr.w-78,
        bottom: 0,
        left: 39,
        backgroundColor: '#aab9ba',
    },
});
