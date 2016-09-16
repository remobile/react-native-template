'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var grid = 4;
exports["default"] = _reactNative.StyleSheet.create({
    head_default_s: {
        width: 18,
        height: 18,
        backgroundColor: _default2["default"].fill_base,
        borderRadius: 18,
        borderWidth: _default2["default"].border_width_lg,
        borderColor: _default2["default"].brand_primary,
        borderStyle: 'solid'
    },
    head_blue_s: {
        borderColor: _default2["default"].brand_primary
    },
    head_gray_s: {
        borderColor: _default2["default"].color_text_placeholder
    },
    head_red_s: {
        borderColor: _default2["default"].brand_error
    },
    icon_s: {
        width: 14,
        height: 14
    },
    head_default_l: {
        width: 24,
        height: 24,
        backgroundColor: _default2["default"].fill_base,
        borderRadius: 18,
        borderWidth: _default2["default"].border_width_lg,
        borderColor: _default2["default"].brand_primary,
        borderStyle: 'solid'
    },
    head_blue_l: {
        borderColor: _default2["default"].brand_primary,
        backgroundColor: _default2["default"].brand_primary
    },
    head_gray_l: {
        borderColor: _default2["default"].color_text_placeholder,
        backgroundColor: _default2["default"].color_text_placeholder
    },
    head_red_l: {
        borderColor: _default2["default"].brand_error,
        backgroundColor: _default2["default"].brand_error
    },
    tail_default_l: {
        width: _default2["default"].border_width_lg,
        height: 30,
        marginLeft: 11
    },
    icon_l: {
        width: 20,
        height: 20
    },
    tail_default_s: {
        width: _default2["default"].border_width_lg,
        height: 30,
        marginLeft: 2 * grid
    },
    tail_gray: {
        backgroundColor: _default2["default"].color_text_placeholder
    },
    tail_blue: {
        backgroundColor: _default2["default"].brand_primary
    },
    tail_error: {
        backgroundColor: _default2["default"].brand_error
    },
    tail_last: {
        backgroundColor: 'transparent'
    },
    content_s: {
        paddingLeft: _default2["default"].h_spacing_md
    },
    content_l: {
        paddingLeft: _default2["default"].h_spacing_lg
    },
    title_s: {
        fontWeight: 'bold',
        fontSize: _default2["default"].font_size_caption,
        paddingBottom: _default2["default"].v_spacing_md,
        color: _default2["default"].color_text_base
    },
    description_s: {
        fontSize: _default2["default"].font_size_caption_sm,
        color: _default2["default"].color_text_base
    },
    title_l: {
        fontWeight: 'bold',
        fontSize: _default2["default"].font_size_heading,
        paddingBottom: _default2["default"].v_spacing_md,
        color: _default2["default"].color_text_base
    },
    description_l: {
        fontSize: _default2["default"].font_size_subhead,
        color: _default2["default"].color_text_base
    }
});
module.exports = exports['default'];