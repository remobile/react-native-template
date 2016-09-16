'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _default = require('../../style/themes/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
    progressOuter: {
        backgroundColor: _default2["default"].border_color_base,
        flex: 1
    },
    progressBar: {
        borderBottomWidth: 4,
        borderStyle: 'solid',
        borderColor: _default2["default"].brand_primary
    }
};
module.exports = exports['default'];