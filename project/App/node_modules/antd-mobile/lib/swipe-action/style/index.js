'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = _reactNative.StyleSheet.create({
    actions: {
        flexDirection: 'column'
    },
    buttonWrap: {
        borderTopWidth: 1,
        borderTopColor: _default2["default"].border_color_base,
        borderStyle: 'solid',
        paddingVertical: 12
    },
    button: {
        textAlign: 'center',
        color: _default2["default"].color_link,
        fontSize: _default2["default"].link_button_font_size
    }
});
module.exports = exports['default'];