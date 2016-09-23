"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isEmptyArray = isEmptyArray;
exports["default"] = isChildrenEqual;
function isEmptyArray(a) {
    return !a || !a.length;
}
function isChildrenEqual(c1, c2, pure) {
    if (isEmptyArray(c1) && isEmptyArray(c2)) {
        return true;
    }
    if (pure) {
        return c1 === c2;
    }
    if (c1.length !== c2.length) {
        return false;
    }
    var len = c1.length;
    for (var i = 0; i < len; i++) {
        if (c1[i].value !== c2[i].value || c1[i].label !== c2[i].label) {
            return false;
        }
    }
    return true;
}