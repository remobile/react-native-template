import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
} from 'react-native';

class Input extends Component {
    constructor() {
        super();
        this.state = {
            height: 35,
        };
    }
    componentWillMount() {
        const {maxLines, style, maxHeight} = this.props;
        const {height, lineHeight, fontSize} = StyleSheet.flatten(style);
        this.defaultHeight = height;
        this.maxHeight = maxLines ? (maxLines*(lineHeight ? lineHeight : fontSize*1.5)) : maxHeight || 99999;
        if (this.defaultHeight) {
            this.setState({height:this.defaultHeight});
        }
    }
    handleChange(event) {
        const {onChange} = this.props;
        const {height} = event.nativeEvent.contentSize;

        if (this.state.height !== height && height < this.maxHeight) {
            this.setState({
                height: Math.min(Math.max(this.defaultHeight, height), this.maxHeight)
            });
        }
        onChange && onChange(event);
    }
    resetInputText() {
        this.refs.input.setNativeProps({ text: '' });
        this.setState({height: this.defaultHeight});
    }
    render() {
        return (
            <TextInput
                ref="input"
                multiline
                {...this.props}
                style={[this.props.style, { height: this.state.height}]}
                onChange={this.handleChange.bind(this)}
                />
        );
    }
}

Input.propTypes = {
    style: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.array,
        React.PropTypes.object
    ]),
    onChange: React.PropTypes.func,
};


module.exports = Input;
