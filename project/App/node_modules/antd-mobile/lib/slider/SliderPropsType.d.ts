interface SliderProps {
    onChange?: () => void;
    onAfterChange?: () => void;
    defaultValue?: number;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    prefixCls?: string;
}
export default SliderProps;
