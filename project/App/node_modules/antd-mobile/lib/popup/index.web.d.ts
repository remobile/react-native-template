export default class Popup {
    static newInstance: () => {
        show: (content: any, config: any) => void;
        hide: () => void;
    };
    static show: (content: any, config: any) => void;
    static hide: () => void;
}
