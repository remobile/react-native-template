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
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    size: {
        width: 80,
        height: 80
    },
    item: {
        marginRight: _default2["default"].h_spacing_sm,
        marginBottom: _default2["default"].v_spacing_sm,
        overflow: 'hidden'
    },
    image: {
        overflow: 'hidden',
        borderRadius: _default2["default"].radius_sm
    },
    closeWrap: {
        width: 16,
        height: 16,
        backgroundColor: '#999',
        borderRadius: 8,
        position: 'absolute',
        top: 4,
        right: 4,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    closeText: {
        color: _default2["default"].color_text_base_inverse,
        backgroundColor: 'transparent',
        fontSize: 20,
        height: 20,
        marginTop: -8,
        fontWeight: '300'
    },
    plusWrap: {
        borderRadius: _default2["default"].radius_sm,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusWrapNormal: {
        backgroundColor: _default2["default"].fill_base,
        borderColor: _default2["default"].border_color_base
    },
    plusWrapHighlight: {
        backgroundColor: _default2["default"].fill_tap,
        borderColor: _default2["default"].border_color_base
    },
    plusText: {
        fontSize: 64,
        backgroundColor: 'transparent',
        fontWeight: '100',
        color: _default2["default"].color_text_caption
    }
});
module.exports = exports['default'];