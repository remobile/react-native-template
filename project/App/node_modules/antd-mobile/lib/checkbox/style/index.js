'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = _reactNative.StyleSheet.create({
    icon: {
        width: _default2["default"].icon_size_sm,
        height: _default2["default"].icon_size_sm
    },
    agreeItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    agreeItemCheckbox: {
        marginLeft: _default2["default"].h_spacing_lg,
        marginRight: _default2["default"].h_spacing_md
    },
    checkboxItemCheckbox: {
        marginRight: _default2["default"].h_spacing_md,
        alignSelf: 'center'
    }
});
module.exports = exports['default'];