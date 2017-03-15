'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
} = ReactNative;

var resolveAssetSource = require('resolveAssetSource');
var Cocos2dx = require('@remobile/react-native-cocos2dx');
var SplashScreen = require('@remobile/react-native-splashscreen');

var qq = require('./img/qq.png');

module.exports = React.createClass({
    componentDidMount () {
        SplashScreen.hide();
    },
    renderCocos2dx() {
        return (params)=> {
            cc.game.onStart = function(){
                var MyScene = cc.Scene.extend({
                    onEnter:function () {
                        this._super();
                        var size = cc.director.getWinSize();

                        var sprite = cc.Sprite.create(params.img.qq);
                        sprite.setPosition(size.width / 2, size.height / 2);
                        sprite.setScale(0.8);
                        this.addChild(sprite, 0);

                        var label = cc.LabelTTF.create("Hello World", "Arial", 40);
                        label.setPosition(size.width / 2, size.height / 2);
                        label.setColor(255, 0,255);
                        this.addChild(label, 1);
                    }
                });
                cc.director.runScene(new MyScene());
            };
            cc.game.run();
        }
    },
    render () {
        const params = {
            img: {
                qq: resolveAssetSource(qq).uri,
                // qq: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
            }
        };
        return (
            <View style={styles.container}>
                <Cocos2dx
                    renderCocos2dx={this.renderCocos2dx()}
                    cocos2dxParams={params}
                    width={200}
                    height={200}
                    />
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'gray',
    },
});
