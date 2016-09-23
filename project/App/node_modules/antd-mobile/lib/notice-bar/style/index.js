'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = _reactNative.StyleSheet.create({
    notice: {
        backgroundColor: _default2["default"].notice_bar_fill,
        height: _default2["default"].notice_bar_height,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        fontSize: _default2["default"].font_size_subhead,
        color: _default2["default"].brand_warning,
        marginRight: _default2["default"].h_spacing_lg
    },
    left6: {
        marginLeft: _default2["default"].h_spacing_sm
    },
    left15: {
        marginLeft: _default2["default"].h_spacing_lg
    },
    close: {
        color: _default2["default"].brand_warning,
        fontSize: _default2["default"].font_size_display_sm,
        marginRight: _default2["default"].h_spacing_lg,
        fontWeight: '200'
    },
    link: {
        transform: [{ rotate: '225deg' }],
        color: _default2["default"].brand_warning,
        fontSize: _default2["default"].font_size_icontext,
        fontWeight: '500',
        marginRight: _default2["default"].h_spacing_lg
    }
});
module.exports = exports['default'];