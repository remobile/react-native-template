interface TabBarProps {
    badge?: string | number;
    onPress?: () => void;
    selected?: boolean;
    icon?: any;
    selectedIcon?: any;
    style?: any;
    children: any;
    title: string;
    tintColor?: string;
    unselectedTintColor?: string;
    systemIcon?: any;
    renderAsOriginal?: boolean;
    rootPrefixCls?: string;
    className?: string;
}
export default TabBarProps;
