'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = _reactNative.StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    totalStyle: {
        fontSize: _default2["default"].font_size_display_sm,
        color: _default2["default"].color_text_base
    },
    activeTextStyle: {
        fontSize: _default2["default"].font_size_display_sm,
        color: _default2["default"].color_link
    },
    indicatorStyle: {
        flexDirection: 'row'
    },
    pointStyle: {
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: _default2["default"].input_color_icon
    },
    pointActiveStyle: {
        backgroundColor: '#888'
    },
    spaceStyle: {
        marginHorizontal: _default2["default"].h_spacing_sm / 2
    }
});
module.exports = exports['default'];