interface NoticeBarPropsType {
    mode?: 'closable' | 'link';
    onClick?: () => void;
    type?: 'success' | 'error' | 'warn' | 'question' | 'info';
    style?: {};
    className?: string;
    prefixCls?: string;
}
export default NoticeBarPropsType;
