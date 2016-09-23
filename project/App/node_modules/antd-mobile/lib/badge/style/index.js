'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactNative = require('react-native');

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var grid = 4;
exports["default"] = _reactNative.StyleSheet.create({
    wrap: {
        flexDirection: 'row'
    },
    textCornerWrap: {
        overflow: 'hidden'
    },
    dot: {
        width: 2 * grid,
        height: 2 * grid,
        borderRadius: grid,
        backgroundColor: _default2["default"].brand_important,
        position: 'absolute',
        top: -1 * grid,
        right: -1 * grid
    },
    dotSizelarge: {
        width: 4 * grid,
        height: 4 * grid,
        borderRadius: 2 * grid
    },
    textDom: {
        paddingVertical: 0.5 * grid,
        paddingHorizontal: 2 * grid,
        backgroundColor: _default2["default"].brand_important,
        borderRadius: 4 * _default2["default"].radius_sm,
        borderStyle: 'solid',
        position: 'absolute',
        top: -10,
        right: -15
    },
    textCorner: {
        width: 18 * grid,
        backgroundColor: _default2["default"].brand_important,
        transform: [{
            rotate: '45deg'
        }],
        position: 'absolute',
        top: 2 * grid
    },
    textCornerlarge: {
        width: 26 * grid,
        top: 3 * grid
    },
    text: {
        color: _default2["default"].color_text_base_inverse,
        textAlign: 'center'
    }
});
module.exports = exports['default'];