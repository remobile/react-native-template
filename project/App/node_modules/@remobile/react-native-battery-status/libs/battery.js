/*
*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*
*/

/**
* This class contains information about the current battery status.
* @constructor
*/
var exec = require('@remobile/react-native-cordova').exec;

var STATUS_CRITICAL = 5;
var STATUS_LOW = 20;
var subscription = null;

exports.register = function(options) {
    var _level = null;
    var _isPlugged = null;
    const {onBatteryStatus, onBatteryLow, onBatteryCritical} = options;
    if (onBatteryStatus||onBatteryLow||onBatteryCritical) {
        subscription = EventEmitter.addListener('BATTERY_STATUS_EVENT', (info)=>{
            if (info) {
                if (_level !== info.level || _isPlugged !== info.isPlugged) {

                    if(info.level === null && _level !== null) {
                        return; // special case where callback is called because we stopped listening to the native side.
                    }

                    // Something changed. Fire batterystatus event
                    onBatteryStatus && onBatteryStatus(info);

                    if (!info.isPlugged) { // do not fire low/critical if we are charging. issue: CB-4520
                        // note the following are NOT exact checks, as we want to catch a transition from
                        // above the threshold to below. issue: CB-4519
                        if (_level > STATUS_CRITICAL && info.level <= STATUS_CRITICAL) {
                            // Fire critical battery event
                            onBatteryCritical && onBatteryCritical(info);
                        }
                        else if (_level > STATUS_LOW && info.level <= STATUS_LOW) {
                            // Fire low battery event
                            onBatteryCritical && onBatteryCritical(info);
                        }
                    }
                    _level = info.level;
                    _isPlugged = info.isPlugged;
                }
            }
        });
    }
    exec(null, null, "BatteryStatus", "start", []);
};

exports.unregister = function(opt) {
    subscription && subscription.remove();
    exec(null, null, "BatteryStatus", "stop", []);
};
