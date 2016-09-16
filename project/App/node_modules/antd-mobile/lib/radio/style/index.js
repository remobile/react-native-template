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
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioItemRadio: {
        marginLeft: _default2["default"].h_spacing_lg,
        marginRight: _default2["default"].h_spacing_md
    },
    radioItemContent: {
        color: _default2["default"].color_text_base,
        fontSize: _default2["default"].font_size_heading
    },
    radioItemContentDisable: {
        color: _default2["default"].color_text_disabled
    }
});
module.exports = exports['default'];