interface StepProps {
    min?: number;
    max?: number;
    step?: number | string;
    readOnly?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    value?: number;
    defaultValue?: number;
    onChange?: (value) => void;
    style?: {};
    styles?: any;
    upStyle?: {};
    downStyle?: {};
    inputStyle?: {};
    prefixCls?: 'am-stepper';
    name?: string;
    showNumber?: boolean;
    className?: string;
}
export default StepProps;
