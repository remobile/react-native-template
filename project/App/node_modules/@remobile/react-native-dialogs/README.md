# React Native Dialogs (remobile)
A dialogs for react-native, code come from cordova, support for android and ios

## Installation
```sh
npm install @remobile/react-native-dialogs --save
```

### Installation (iOS)
* Drag RCTDialogs.xcodeproj to your project on Xcode.
* Click on your main project file (the one that represents the .xcodeproj) select Build Phases and drag libRCTDialogs.a from the Products folder inside the RCTDialogs.xcodeproj.
* Look for Header Search Paths and make sure it contains $(SRCROOT)/../../../react-native/React as recursive.
* Drag CDVNotification.bundle to your project's resource

### Installation (Android)
```gradle
...
include ':react-native-dialogs'
project(':react-native-dialogs').projectDir = new File(settingsDir, '../node_modules/@remobile/react-native-dialogs/android')
```

* In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-dialogs')
}
```

* register module (in MainApplication.java)

```java
......
import com.remobile.dialogs.RCTDialogsPackage;  // <--- import

......

@Override
protected List<ReactPackage> getPackages() {
   ......
   new RCTDialogsPackage(),            // <------ add here
   ......
}


## Usage

### Example
```js
var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
} = ReactNative;

var Dialogs = require('@remobile/react-native-dialogs');
var Button = require('@remobile/react-native-simple-button');
var alert = Dialogs.alert;

module.exports = React.createClass({
    testAlert () {
        function alertDismissed() {
            alert('You selected button');
        }
        Dialogs.alert(
            'You are the winner!',  // message
            alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
    },
    testConfirm () {
        function onConfirm(buttonIndex) {
            alert('You selected button ' + buttonIndex);
        }
        Dialogs.confirm(
            'You are the winner!', // message
            onConfirm,            // callback to invoke with index of button pressed
            'Game Over',           // title
            ['Restart','Exit']     // buttonLabels
        );
    },
    testPrompt () {
        function onPrompt(results) {
            alert('You selected button number ' + results.buttonIndex + ' and entered ' + results.input1);
        }
        Dialogs.prompt(
            'Please enter your name',  // message
            onPrompt,                  // callback to invoke
            'Registration',            // title
            ['Ok','Exit'],             // buttonLabels
            'Jane Doe'                 // defaultText
        );
    },
    testBeep () {
        Dialogs.beep(2);
    },
    testActivityStart() {
        Dialogs.activityStart('fang', 'fangyunjiang');
    },
    testProgressStart() {
        Dialogs.progressStart('fang', 'fangyunjiang');
    },
    render() {
        var additional = app.isandroid?[
            <Button onPress={this.testActivityStart} key='testActivityStart'>
                Test ActivityStart
            </Button>,
            <Button onPress={this.testProgressStart} key='testProgressStart'>
                Test ProgressStart
            </Button>,
        ]:null;
        return (
            <View style={styles.container}>
                <Button onPress={this.testAlert}>
                    Test Alert
                </Button>
                <Button onPress={this.testConfirm}>
                    Test Confirm
                </Button>
                <Button onPress={this.testPrompt}>
                    Test Prompt
                </Button>
                <Button onPress={this.testBeep}>
                    Test Beep
                </Button>
                {additional}
            </View>
        );
    },
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingVertical: 150,
    },
});
```

### HELP
* look https://github.com/apache/cordova-plugin-dialogs


### thanks
* this project come from https://github.com/apache/cordova-plugin-dialogs


### see detail use
* https://github.com/remobile/react-native-template
