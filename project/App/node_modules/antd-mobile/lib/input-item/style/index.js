'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
    container: {
        height: _default2["default"].list_item_height + _default2["default"].border_width_sm,
        borderBottomWidth: _default2["default"].border_width_sm,
        borderBottomColor: _default2["default"].border_color_base,
        marginLeft: _default2["default"].h_spacing_lg,
        paddingRight: _default2["default"].h_spacing_lg,
        marginTop: 0,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        marginRight: _default2["default"].h_spacing_sm,
        textAlignVertical: 'center',
        fontSize: _default2["default"].font_size_heading,
        color: _default2["default"].color_text_base
    },
    input: {
        flex: 1,
        height: _default2["default"].list_item_height,
        backgroundColor: _default2["default"].fill_base,
        fontSize: _default2["default"].font_size_heading
    },
    extra: {
        marginLeft: _default2["default"].h_spacing_sm,
        fontSize: _default2["default"].font_size_subhead,
        color: _default2["default"].color_text_caption
    },
    errorIcon: {
        marginLeft: _default2["default"].h_spacing_sm,
        width: _default2["default"].icon_size_sm,
        height: _default2["default"].icon_size_sm
    }
};
module.exports = exports['default'];