'use strict';

var exec = require('@remobile/react-native-cordova').exec;

module.exports = {
    callNumber: (success, failure, number, bypassAppChooser)=>{
        exec(success, failure, "Call", "callNumber", [number, bypassAppChooser]);
    }
}
