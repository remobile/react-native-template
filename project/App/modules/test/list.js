'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    View,
    Text,
    Image,
    StyleSheet,
} = ReactNative;

const { PageList } = COMPONENTS;
const SplashScreen = require('@remobile/react-native-splashscreen');

module.exports = React.createClass({
    componentDidMount () {
        SplashScreen.hide();
    },
    renderRow (obj) {
        return (
            <View>
                <Text>图{obj}</Text>
                <Image
                    resizeMode='stretch'
                    source={{ uri:'http://localhost:3000/images/' + ((obj % 7) + 1) + '.png' }}
                    style={styles.icon_item} />
            </View>
        );
    },
    render () {
        return (
            <View style={styles.container}>
                <PageList
                    renderRow={this.renderRow}
                    listParam={{ userID:'123' }}
                    listName='list'
                    listUrl='http://localhost:3000/getTestList'
                    />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 64,
    },
    icon_item: {
        height: 200,
    },
});
