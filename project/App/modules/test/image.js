'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
} = ReactNative;

var Button = require('@remobile/react-native-simple-button');

var DImage =  React.createClass({
    getInitialState() {
        return {showDefault: true}
    },
    onLoad() {
        this.setState({showDefault: false});
    },
    componentWillReceiveProps(nextProps) {
        var pre = this.props.source, post = nextProps.source;
        var preuri = pre.uri, posturi = post.uri;
        var preT = typeof posturi === 'string', postT = typeof posturi === 'string';
        if ((!(preT^postT)) && preuri !== posturi) {
            this.setState({showDefault: true});
        }
    },
    render() {
        var {source, defaultSource, ...other} = this.props;
        var {showDefault} = this.state;
        return (
            showDefault ?
            <Image source={defaultSource} {...other}>
                <Image
                    source={source}
                    onLoad={this.onLoad}
                    style={{width:1,height:1}}/>
            </Image>
            :
            <Image source={source} {...other} />
        )
    }
});


module.exports = React.createClass({
    // getInitialState() {
    //     return {index: 1}
    // },
    // changePicture() {
    //     var index = this.state.index+1;
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
    getInitialState() {
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        return {
            dataSource: this.ds.cloneWithRows(['']),
        };
    },
    renderRow(obj, sectionID, rowID) {
        return (
            <View>
                <DImage
                    resizeMode='cover'
                    defaultSource={app.img.personal_default_head}
                    source={{uri:obj}}
                    style={styles.headImage} />
            </View>
        )
    },
    changePicture() {
        this.setState({
                dataSource: this.ds.cloneWithRows([
                    'http://localhost:3000/images/1.png',
                    '',
                    'http://localhost:3000/images/2.png',
                ]),
            });
    },
    render() {
        return (
            <View style={styles.container}>
            <Button onPress={this.changePicture}>更换图片</Button>
            <ListView
                    enableEmptySections={true}
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    />
            </View>
        )
    }
});


var styles = StyleSheet.create({
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
