'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function noop() {}
function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

var InputItem = function (_React$Component) {
    (0, _inherits3["default"])(InputItem, _React$Component);

    function InputItem(props) {
        (0, _classCallCheck3["default"])(this, InputItem);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.onInputChange = function (e) {
            var value = e.target.value;
            var _this$props = _this.props;
            var onChange = _this$props.onChange;
            var type = _this$props.type;

            switch (type) {
                case 'text':
                    break;
                case 'bankCard':
                    value = value.replace(/\D/g, '');
                    value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
                    break;
                case 'phone':
                    value = value.replace(/\D/g, '').substring(0, 11);
                    var valueLen = value.length;
                    if (valueLen > 3 && valueLen < 8) {
                        value = value.substr(0, 3) + ' ' + value.substr(3);
                    } else if (valueLen >= 8) {
                        value = value.substr(0, 3) + ' ' + value.substr(3, 4) + ' ' + value.substr(7);
                    }
                    break;
                case 'number':
                    value = value.replace(/\D/g, '');
                    break;
                case 'password':
                    break;
                default:
                    break;
            }
            onChange(value);
        };
        _this.onInputBlur = function (e) {
            setTimeout(function () {
                _this.setState({
                    focus: false
                });
            }, 300);
            var value = e.target.value;
            _this.props.onBlur(value);
        };
        _this.onInputFocus = function (e) {
            _this.setState({
                focus: true
            });
            var value = e.target.value;
            _this.props.onFocus(value);
        };
        _this.onExtraClick = function (e) {
            _this.props.onExtraClick(e);
        };
        _this.onErrorClick = function (e) {
            _this.props.onErrorClick(e);
        };
        _this.clearInput = function () {
            _this.setState({
                placeholder: _this.props.value
            });
            _this.props.onChange('');
        };
        _this.state = {
            focus: false,
            placeholder: _this.props.placeholder
        };
        return _this;
    }

    InputItem.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('placeholder' in nextProps && this.state.placeholder !== nextProps.placeholder) {
            this.setState({
                placeholder: nextProps.placeholder
            });
        }
    };

    InputItem.prototype.render = function render() {
        var _classNames, _classNames2;

        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var prefixListCls = _props.prefixListCls;
        var type = _props.type;
        var value = _props.value;
        var defaultValue = _props.defaultValue;
        var name = _props.name;
        var editable = _props.editable;
        var disabled = _props.disabled;
        var style = _props.style;
        var clear = _props.clear;
        var children = _props.children;
        var error = _props.error;
        var className = _props.className;
        var extra = _props.extra;
        var labelNumber = _props.labelNumber;
        var maxLength = _props.maxLength;

        var valueProps = void 0;
        if (value !== undefined) {
            valueProps = {
                value: fixControlledValue(value)
            };
        } else {
            valueProps = {
                defaultValue: defaultValue
            };
        }
        var _state = this.state;
        var focus = _state.focus;
        var placeholder = _state.placeholder;

        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixListCls + '-item', true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-item', true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-disabled', disabled), (0, _defineProperty3["default"])(_classNames, prefixCls + '-error', error), (0, _defineProperty3["default"])(_classNames, prefixCls + '-focus', focus), (0, _defineProperty3["default"])(_classNames, className, className), _classNames));
        var labelCls = (0, _classnames2["default"])((_classNames2 = {}, (0, _defineProperty3["default"])(_classNames2, prefixCls + '-label', true), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-label-2', labelNumber === 2), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-label-3', labelNumber === 3), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-label-4', labelNumber === 4), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-label-5', labelNumber === 5), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-label-6', labelNumber === 6), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-label-7', labelNumber === 7), _classNames2));
        var inputType = 'text';
        if (type === 'bankCard' || type === 'phone') {
            inputType = 'tel';
        } else if (type === 'password') {
            inputType = 'password';
        }
        return React.createElement(
            'div',
            { className: wrapCls, style: style },
            children ? React.createElement(
                'div',
                { className: labelCls },
                children
            ) : null,
            React.createElement(
                'div',
                { className: prefixCls + '-control' },
                React.createElement('input', (0, _extends3["default"])({}, valueProps, { type: inputType, maxLength: maxLength, name: name, placeholder: placeholder, onChange: this.onInputChange, onBlur: this.onInputBlur, onFocus: this.onInputFocus, readOnly: !editable, disabled: disabled, pattern: type === 'number' ? '[0-9]*' : '' }))
            ),
            clear && editable && !disabled && value && value.length > 0 ? React.createElement('div', { className: prefixCls + '-clear', onClick: this.clearInput }) : null,
            error ? React.createElement('div', { className: prefixCls + '-error-extra', onClick: this.onErrorClick }) : null,
            extra !== '' ? React.createElement(
                'div',
                { className: prefixCls + '-extra', onClick: this.onExtraClick },
                extra
            ) : null
        );
    };

    return InputItem;
}(React.Component);

exports["default"] = InputItem;

InputItem.propTypes = {
    type: _react.PropTypes.oneOf(['text', 'bankCard', 'phone', 'password', 'number']),
    size: _react.PropTypes.oneOf(['large', 'small']),
    labelNumber: _react.PropTypes.oneOf([2, 3, 4, 5, 6, 7]),
    labelPosition: _react.PropTypes.oneOf(['left', 'top']),
    textAlign: _react.PropTypes.oneOf(['left', 'center'])
};
InputItem.defaultProps = {
    prefixCls: 'am-input',
    prefixListCls: 'am-list',
    type: 'text',
    name: '',
    defaultValue: '',
    editable: true,
    disabled: false,
    placeholder: '',
    clear: false,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    extra: '',
    onExtraClick: noop,
    error: false,
    onErrorClick: noop,
    size: 'large',
    labelNumber: 4,
    labelPosition: 'left',
    textAlign: 'left'
};
module.exports = exports['default'];