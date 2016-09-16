'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.vars = undefined;

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var vars = exports.vars = _default2["default"];
exports["default"] = _reactNative.StyleSheet.create({
    wrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0
    },
    content: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: _default2["default"].fill_base
    },
    mask: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: _default2["default"].fill_mask
    },
    title: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: _default2["default"].h_spacing_lg,
        marginBottom: _default2["default"].h_spacing_lg
    },
    titleText: {
        fontWeight: '500'
    },
    message: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        marginBottom: _default2["default"].h_spacing_lg
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: _default2["default"].button_height,
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderTopColor: _default2["default"].border_color_base,
        backgroundColor: 'white'
    },
    cancelBtn: {
        marginTop: _default2["default"].v_spacing_md,
        position: 'relative'
    },
    cancelBtnMask: {
        position: 'absolute',
        top: -_default2["default"].v_spacing_md,
        left: 0,
        right: 0,
        height: _default2["default"].v_spacing_md,
        backgroundColor: '#F7F7F7',
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderTopColor: _default2["default"].border_color_base
    },
    destructiveBtn: {
        color: _default2["default"].brand_error,
        fontSize: _default2["default"].font_size_heading
    }
});