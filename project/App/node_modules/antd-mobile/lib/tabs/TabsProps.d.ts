interface TabsProps {
    activeKey?: string;
    defaultActiveKey?: string;
    onChange?: (key: string) => void;
    onTabClick?: (key: string) => void;
    tabBarPosition?: 'top' | 'bottom';
    animated?: boolean;
    swipeable?: boolean;
    underlineColor?: string;
    activeUnderlineColor?: string;
    textColor?: string;
    activeTextColor?: string;
    styles?: any;
    className?: string;
    prefixCls?: string;
}
export default TabsProps;
