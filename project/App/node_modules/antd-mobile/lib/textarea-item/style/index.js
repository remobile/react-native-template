'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
    container: {
        marginLeft: _default2["default"].h_spacing_lg,
        borderBottomWidth: _default2["default"].border_width_sm,
        borderBottomColor: _default2["default"].border_color_base
    },
    input: {
        paddingHorizontal: _default2["default"].h_spacing_md,
        backgroundColor: _default2["default"].fill_base,
        fontSize: _default2["default"].font_size_heading,
        lineHeight: Math.round(1.3 * _default2["default"].font_size_heading),
        textAlignVertical: 'top'
    },
    icon: {
        position: 'absolute',
        top: 8,
        width: _default2["default"].icon_size_xs,
        height: _default2["default"].icon_size_xs
    },
    errorIcon: {
        position: 'absolute',
        right: 18,
        top: 12
    },
    count: {
        position: 'absolute',
        right: _default2["default"].h_spacing_md,
        bottom: _default2["default"].h_spacing_md
    }
};
module.exports = exports['default'];