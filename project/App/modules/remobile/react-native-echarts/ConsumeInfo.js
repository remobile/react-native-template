'use strict';
var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    ScrollView,
} = ReactNative;

import Echarts from '@remobile/react-native-echarts';

module.exports = React.createClass({
    getInitialState () {
        return {
            data: this.props.data,
        };
    },
    render () {
        const { today, week, month } = this.state.data;
        const optionToday = {
            title: {
                text: '今日消费人数统计',
            },
            grid:{ show:true },
            xAxis: {
                data: ['8', '10', '12', '14', '16', '18', '20', '22', '24'],
                axisTick: {
                    alignWithLabel: true,
                },
            },
            yAxis: {},
            series: [{
                type: 'line',
                data: today,
            }],
        };
        const optionWeek = {
            title: {
                text: '本周消费人数统计',
            },
            grid:{ show:true },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisTick: {
                    alignWithLabel: true,
                },
            },
            yAxis: {},
            series: [{
                type: 'line',
                data: week,
            }],
        };
        const optionMonth = {
            title: {
                text: '本月消费人数统计',
            },
            grid:{ show:true },
            xAxis: {
                data: ['上旬', '中旬', '下旬'],
                axisTick: {
                    alignWithLabel: true,
                },
            },
            yAxis: {},
            series: [{
                type: 'line',
                data: month,
            }],
        };
        return (
            <ScrollView>
                <Echarts option={optionToday} height={sr.s(250)} />
                <Echarts option={optionWeek} height={sr.s(250)} />
                <Echarts option={optionMonth} height={sr.s(250)} />
                <View style={styles.blankView} />
            </ScrollView>
        );
    },
});

var styles = StyleSheet.create({
    blankView: {
        width: sr.w,
        height: 100,
    },
});
