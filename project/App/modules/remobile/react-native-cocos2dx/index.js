'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
} = ReactNative;

var Cocos2dx = require('@remobile/react-native-cocos2dx');

module.exports = React.createClass({
    renderCocos2dx() {
        return ()=> {
            cc.game.onStart = function(){
                var MyScene = cc.Scene.extend({
                    onEnter:function () {
                        this._super();
                        var size = cc.director.getWinSize();

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
        return (
            <View style={styles.container}>
                <Cocos2dx
                    renderCocos2dx={this.renderCocos2dx()}
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
