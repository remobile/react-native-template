var React = require('react-native');var 
Platform = React.Platform;var DrawerLayoutAndroid = React.DrawerLayoutAndroid;

if (Platform.OS === 'android') {
  module.exports = DrawerLayoutAndroid;} else 
if (Platform.OS === 'ios') {
  module.exports = require('./DrawerLayout.ios').default;}