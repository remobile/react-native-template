'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactNative = require('react-native');

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = _reactNative.StyleSheet.create({
    tabbar: {
        flex: 1
    },
    content: {
        flex: 1
    },
    tabs: {
        height: _default2["default"].tab_bar_height,
        borderTopWidth: _default2["default"].border_width_md,
        borderColor: _default2["default"].border_color_base,
        borderStyle: 'solid',
        flexDirection: 'row'
    },
    barItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    barIcon: {
        width: 28,
        height: 28,
        marginTop: 2
    },
    barItemSelected: {},
    barItemTitle: {
        fontSize: _default2["default"].font_size_icontext,
        marginTop: 2
    },
    contentItem: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    contentItemSelected: {
        zIndex: 3
    },
    badge: {
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: _default2["default"].brand_important,
        position: 'absolute',
        top: 0,
        left: 20,
        paddingHorizontal: _default2["default"].h_spacing_sm
    },
    badgeText: {
        textAlign: 'center',
        color: 'white'
    }
});
module.exports = exports['default'];