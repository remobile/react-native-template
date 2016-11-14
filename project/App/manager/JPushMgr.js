'use strict';
var React = require('react');var ReactNative = require('react-native');
var {
    Platform,
    NetInfo,
} = ReactNative;
var EventEmitter = require('EventEmitter');
import JPush , {JpushEventReceiveMessage, JpushEventOpenMessage} from 'react-native-jpush'

class Manager extends EventEmitter {
    constructor() {
        super();
    }
    register() {
        if (!this.pushlisteners) {
            JPush.requestPermissions();
            this.pushlisteners = [
                JPush.addEventListener(JpushEventReceiveMessage, this.onReceiveMessage.bind(this)),
                JPush.addEventListener(JpushEventOpenMessage, this.onOpenMessage.bind(this)),
            ]
        }
    }
    unregister() {
        if (this.pushlisteners) {
            this.pushlisteners.forEach(listener=> {
                JPush.removeEventListener(listener);
            });
        }
    }
    onReceiveMessage(message) {
        console.log("onReceiveMessage", message);
    }
    onOpenMessage(message) {
        console.log("onOpenMessage", message);
    }
}

module.exports = new Manager();
