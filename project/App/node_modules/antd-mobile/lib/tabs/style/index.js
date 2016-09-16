'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactNative = require('react-native');

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = _reactNative.StyleSheet.create({
    text: {
        fontSize: _default2["default"].tabs_font_size_heading
    },
    tab: {
        paddingBottom: 0
    },
    barTop: {
        height: _default2["default"].tabs_height,
        borderTopWidth: 0,
        borderBottomWidth: 1
    },
    barBottom: {
        height: _default2["default"].tabs_height,
        borderTopWidth: 1,
        borderBottomWidth: 0
    },
    underline: {
        height: 2
    }
});
module.exports = exports['default'];