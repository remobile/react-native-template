'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.formatFn = formatFn;
exports.getProps = getProps;

var _zh_CN = require('./locale/zh_CN');

var _zh_CN2 = _interopRequireDefault(_zh_CN);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getFormatter(type) {
    var formatter = void 0;
    if (type === 'time') {
        formatter = 'HH:mm';
    } else if (type === 'datetime') {
        formatter = 'YYYY-MM-DD HH:mm';
    } else {
        formatter = 'YYYY-MM-DD';
    }
    return formatter;
}
function formatFn(instance, value) {
    var format = instance.props.format;

    var type = typeof format === 'undefined' ? 'undefined' : (0, _typeof3["default"])(format);
    if (type === 'string') {
        return value.format(type);
    }
    if (type === 'function') {
        return format(value);
    }
    return value.format(getFormatter(instance.props.mode));
}
function getProps() {
    return {
        mode: 'datetime',
        locale: _zh_CN2["default"],
        extra: '请选择',
        defaultDate: (0, _moment2["default"])(),
        onChange: function onChange() {},

        okText: '确定',
        dismissText: '取消',
        title: ''
    };
}