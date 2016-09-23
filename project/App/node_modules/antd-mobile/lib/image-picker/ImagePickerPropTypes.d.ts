interface ImagePickerPropTypes {
    style?: {};
    files?: Array<{}>;
    onChange?: (files: Array<{}>, operationType: string, index?: number) => void;
    styles?: any;
    prefixCls?: string;
    className?: string;
}
export default ImagePickerPropTypes;
