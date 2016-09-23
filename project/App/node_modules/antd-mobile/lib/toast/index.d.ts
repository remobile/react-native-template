export interface ToastProps {
    content: string;
    duration?: number;
    onClose?: () => void;
    type?: string;
}
declare var _default: {
    SHORT: number;
    LONG: number;
    show(content: string, duration?: number): void;
    info(content: string, duration?: number, onClose?: () => void): void;
    success(content: string, duration?: number, onClose?: () => void): void;
    fail(content: string, duration?: number, onClose?: () => void): void;
    offline(content: string, duration?: number, onClose?: () => void): void;
    loading(content: string, duration?: number, onClose?: () => void): void;
    hide(): void;
};
export default _default;
