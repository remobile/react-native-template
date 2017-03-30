'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
} = ReactNative;

const Button = require('@remobile/react-native-simple-button');

const DImage = React.createClass({
    getInitialState () {
        return { showDefault: true };
    },
    onLoad () {
        this.setState({ showDefault: false });
    },
    componentWillReceiveProps (nextProps) {
        const pre = this.props.source, post = nextProps.source;
        const preuri = pre.uri, posturi = post.uri;
        const preT = typeof posturi === 'string', postT = typeof posturi === 'string';
        if ((!(preT ^ postT)) && preuri !== posturi) {
            this.setState({ showDefault: true });
        }
    },
    render () {
        const { source, defaultSource, ...other } = this.props;
        const { showDefault } = this.state;
        return (
            showDefault ?
                <Image source={defaultSource} {...other}>
                    <Image
                        source={source}
                        onLoad={this.onLoad}
                        style={{ width:1, height:1 }} />
                </Image>
            :
                <Image source={source} {...other} />
        );
    },
});

module.exports = React.createClass({
    // getInitialState() {
    //     return {index: 1}
    // },
    // changePicture() {
    //     const index = this.state.index+1;
    //     if (index > 7) index = 1;
    //     this.setState({index});
    // },
    // render1() {
    //     return (
    //         <View style={styles.container}>
    //             <Button onPress={this.changePicture}>更换图片</Button>
    //             <DImage
    //                 resizeMode='stretch'
    //                 defaultSource={app.img.personal_default_head}
    //                 source={{uri:'http://localhost:3000/images/'+this.state.index+'.png'}}
    //                 style={{width:100, height: 100}} />
    //             <DImage
    //                 resizeMode='stretch'
    //                 defaultSource={app.img.personal_default_head}
    //                 source={app.img.common_income}
    //                 style={{width:100, height: 100}} />
    //             <DImage
    //                 resizeMode='stretch'
    //                 defaultSource={app.img.personal_default_head}
    //                 source={{uri:'http://facebook.github.io/react/img/logo_og.png'}}
    //                 style={{width:100, height: 100}} />
    //         </View>
    //     );
    // },
    getInitialState () {
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        return {
            dataSource: this.ds.cloneWithRows(['']),
        };
    },
    renderRow (obj, sectionID, rowID) {
        return (
            <View>
                <DImage
                    resizeMode='cover'
                    defaultSource={app.img.personal_default_head}
                    source={{ uri:obj }}
                    style={styles.headImage} />
            </View>
        );
    },
    changePicture () {
        this.setState({
            dataSource: this.ds.cloneWithRows([
                'http://localhost:3000/images/1.png',
                '',
                'http://localhost:3000/images/2.png',
            ]),
        });
    },
    render () {
        return (
            <View style={styles.container}>
                <Button onPress={this.changePicture}>更换图片</Button>
                <ListView
                    enableEmptySections
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 20,
        borderColor: '#56C2E7',
        borderWidth: 3,
    },
});
