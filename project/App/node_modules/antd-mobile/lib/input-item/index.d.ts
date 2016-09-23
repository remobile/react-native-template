import * as React from 'react';
import InputItemProps from './InputItemPropsType';
export default class InputItem extends React.Component<InputItemProps, any> {
    static propTypes: {
        type: React.Requireable<any>;
        extra: React.Requireable<any>;
        size: React.Requireable<any>;
        labelNumber: React.Requireable<any>;
        labelPosition: React.Requireable<any>;
        textAlign: React.Requireable<any>;
    };
    static defaultProps: {
        prefixCls: string;
        prefixListCls: string;
        type: string;
        editable: boolean;
        name: string;
        value: string;
        placeholder: string;
        clear: boolean;
        maxLength: number;
        onChange: () => void;
        onBlur: () => void;
        onFocus: () => void;
        extra: string;
        onExtraPress: () => void;
        error: boolean;
        onErrorPress: () => void;
        size: string;
        labelNumber: number;
        labelPosition: string;
        textAlign: string;
        last: boolean;
    };
    constructor(props: any);
    onChange: (text: any) => void;
    render(): JSX.Element;
}
