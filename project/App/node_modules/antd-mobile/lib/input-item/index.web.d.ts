import * as React from 'react';
import InputItemProps from './InputItemPropsType';
export interface InputItemState {
    focus?: boolean;
    placeholder?: string;
}
export default class InputItem extends React.Component<InputItemProps, InputItemState> {
    static propTypes: {
        type: React.Requireable<any>;
        size: React.Requireable<any>;
        labelNumber: React.Requireable<any>;
        labelPosition: React.Requireable<any>;
        textAlign: React.Requireable<any>;
    };
    static defaultProps: {
        prefixCls: string;
        prefixListCls: string;
        type: string;
        name: string;
        defaultValue: string;
        editable: boolean;
        disabled: boolean;
        placeholder: string;
        clear: boolean;
        onChange: () => void;
        onBlur: () => void;
        onFocus: () => void;
        extra: string;
        onExtraClick: () => void;
        error: boolean;
        onErrorClick: () => void;
        size: string;
        labelNumber: number;
        labelPosition: string;
        textAlign: string;
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    onInputChange: (e: any) => void;
    onInputBlur: (e: any) => void;
    onInputFocus: (e: any) => void;
    onExtraClick: (e: any) => void;
    onErrorClick: (e: any) => void;
    clearInput: () => void;
    render(): JSX.Element;
}
