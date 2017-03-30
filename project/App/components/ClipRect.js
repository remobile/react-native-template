'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    Shape,
    Surface,
    Path,
} = ReactNative.ART;

const ClipRectIOS = React.createClass({
    render: function () {
        const style = ReactNative.StyleSheet.flatten(this.props.style);
        let { width, height, borderRadius, borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius, color } = style;
        borderRadius = borderRadius || 0;
        const tl = borderTopLeftRadius || borderRadius;
        const tr = borderTopRightRadius || borderRadius;
        const br = borderBottomRightRadius || borderRadius;
        const bl = borderBottomLeftRadius || borderRadius;

        const path = Path();

        path.move(0, tl);

        if (tl > 0) { path.arc(tl, -tl); }
        path.line(width - (tr + tl), 0);

        if (tr > 0) { path.arc(tr, tr); }
        path.line(0, height - (tr + br));

        if (br > 0) { path.arc(-br, br); }
        path.line(-width + (br + bl), 0);

        if (bl > 0) { path.arc(-bl, -bl); }
        path.line(0, bl)
        .line(width, 0)
        .line(0, -height)
        .line(-width, 0);

        return (
            <Surface width={width} height={height} style={{ backgroundColor:'transparent' }}>
                <Shape d={path} fill={color} />
            </Surface>
        );
    },
});

const TIMES = 30;
const _X = (r, d) => Math.cos(Math.PI / 180 * d) * r;
const _Y = (r, d) => Math.sin(Math.PI / 180 * d) * r;
const arc = (path, x, y, r, t) => {
    const offset = 90 / TIMES;
    for (let i = 0; i <= TIMES; i++) {
        path.lineTo(x - _X(r, 90 * t + offset * i), y - _Y(r, 90 * t + offset * i));
    }
};

const ClipRectAndroid = React.createClass({
    render: function () {
        const style = ReactNative.StyleSheet.flatten(this.props.style);
        let { width, height, borderRadius, borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius, color } = style;
        borderRadius = borderRadius || 0;
        const tl = borderTopLeftRadius || borderRadius;
        const tr = borderTopRightRadius || borderRadius;
        const br = borderBottomRightRadius || borderRadius;
        const bl = borderBottomLeftRadius || borderRadius;

        const path = Path();

        path.move(0, tl);

        if (tl > 0) { arc(path, tl, tl, tl, 0); }
        path.line(width - (tr + tl), 0);

        if (tr > 0) { arc(path, width - tr, tr, tr, 1); }
        path.line(0, height - (tr + br));

        if (br > 0) { arc(path, width - br, height - br, br, 2); }
        path.line(-width + (br + bl), 0);

        if (bl > 0) { arc(path, bl, height - bl, bl, 3); }
        path.line(0, bl)
        .line(width, 0)
        .line(0, -height)
        .line(-width, 0);

        return (
            <Surface width={width} height={height} style={{ backgroundColor:'transparent' }}>
                <Shape d={path} fill={color} />
            </Surface>
        );
    },
});

module.exports = ReactNative.Platform.OS === 'android' ? ClipRectAndroid : ClipRectIOS;
