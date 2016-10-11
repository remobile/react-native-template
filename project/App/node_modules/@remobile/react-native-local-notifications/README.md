# React Native LocalNotifications (remobile)
A cordova local-notifications for react-native, supprt for ios and android

## Installation
```sh
npm install @remobile/react-native-local-notifications --save
```
### Installation (iOS)
* Drag RCTLocalNotifications.xcodeproj to your project on Xcode.
* Click on your main project file (the one that represents the .xcodeproj) select Build Phases and drag libRCTLocalNotifications.a from the Products folder inside the RCTLocalNotifications.xcodeproj.
* Look for Header Search Paths and make sure it contains $(SRCROOT)/../../../react-native/React as recursive.
* Look for Header Search Paths and make sure it contains $(SRCROOT)/../../react-native-cordova/ios/RCTCordova.
* Look for Header Search Paths and make sure it contains $(SRCROOT)/../../../../ios/${your main project}.

* register didReceiveLocalNotification (in AppDelegate.m)

```obj-c
// repost all remote and local notification using the default NSNotificationCenter so multiple plugins may respond
- (void)            application:(UIApplication*)application
    didReceiveLocalNotification:(UILocalNotification*)notification
{
  // re-post ( broadcast )
  [[NSNotificationCenter defaultCenter] postNotificationName:@"CDVLocalNotification" object:notification];
}
```

### Installation (Android)
```gradle
...
include ':react-native-local-notifications'
project(':react-native-local-notifications').projectDir = new File(settingsDir, '../node_modules/@remobile/react-native-local-notifications/android')
```

* In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-local-notifications')
}
```

* register module (in MainApplication.java)

```java
......
import com.remobile.localNotifications.RCTLocalNotificationsPackage; // <--- import

......

@Override
protected List<ReactPackage> getPackages() {
   ......
   new RCTLocalNotificationsPackage(),            // <------ add here
   ......
}

```

### Screencasts
![image](https://github.com/remobile/react-native-local-notifications/blob/master/screencasts/1.png)
![image](https://github.com/remobile/react-native-local-notifications/blob/master/screencasts/2.png)

## Usage

### Example
```js
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} = ReactNative;


var  Button = require('@remobile/react-native-simple-button');
var LocalNotification = require('@remobile/react-native-local-notifications');

module.exports = React.createClass({
    test() {
        var now             = new Date().getTime(),
        _n_sec_from_now = new Date(now + 10*1000);

        LocalNotification.schedule({
            id: 10,
            title: "Meeting in 15 minutes!",
            text: "Jour fixe Produktionsbesprechung",
            at: _n_sec_from_now,
            data: { meetingId:"#123FG8" }
        });
        LocalNotification.on("click", function (notification) {
            if (notification.id == 10) {
                joinMeeting(notification.data.meetingId);
            }
        });

        // Notification has reached its trigger time (Tomorrow at 8:45 AM)
        LocalNotification.on("trigger", function (notification) {
            if (notification.id != 10)
                return;
            // After 5 seconds update notification's title
            setTimeout(function () {
                LocalNotification.update({
                    id: 10,
                    title: "Meeting in 10 minutes!"
                });
            }, 5000);
        });
    },
    render: function() {
        return (
            <View style={styles.container}>
                <Button onPress={this.test}>
                    test
                </Button>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
});
```

### HELP
* look https://github.com/katzer/cordova-plugin-local-notifications/wiki


### thanks
* this project come from https://github.com/katzer/cordova-plugin-local-notifications

### see detail use
* https://github.com/remobile/react-native-template
