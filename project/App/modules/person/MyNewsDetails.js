'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
} = ReactNative;

var {Button} = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '详细信息',
    },
    getInitialState() {
        return {
            contentText: this.props.contentText,
            time: this.props.time,
        };
    },
    render() {
        return (
          <View style={styles.container}>
              <View style={styles.newsTitle}>
                  <Image
                    resizeMode='contain'
                    source={app.img.personal_news_read}
                    style={styles.icon}  />
                  <Text style={styles.titleNameText}>系统消息</Text>
                  <Text style={styles.titleTimeText}>{this.state.time}</Text>
              </View>
              <Text style={styles.newsLine}></Text>
              <ScrollView style={styles.newsContent}>
                  <Text>{this.state.contentText}</Text>
              </ScrollView>
          </View>
        )
    }
});

var styles = StyleSheet.create({
  container: {
      marginTop: 10,
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
  },
  newsTitle: {
      flex: 3,
      height: 30,
      flexDirection: 'row',
      alignSelf: 'flex-start',
  },
  icon: {
      width: 30,
      height: 30,
  },
  titleNameText: {
    fontSize: 15,
    color: 'gray',
    alignSelf: 'center',
  },
  titleTimeText: {
    marginLeft: 10,
    fontSize: 15,
    alignSelf: 'center',
    color: 'gray',
  },
  newsLine: {
    marginTop: 4,
    width: sr.w-4,
    height: 2,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: '#00BBFF',
  },
  newsContent: {
    marginTop: 10,
    width: sr.w-30,
    height: sr.h-160,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
});
