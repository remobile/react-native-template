const moment = require('moment');

module.exports = {
    until (test, iterator, callback) {
        if (!test()) {
            iterator((err) => {
                if (err) {
                    return callback(err);
                }
                this.until(test, iterator, callback);
            });
        } else {
            callback();
        }
    },
    toThousands (num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    getPercentages (list) {
        const sum = _.sum(list);
        return list.map((v) => Math.round(v * 100 / sum) + '%');
    },
    chineseWeekDay (day) {
        return ['日', '一', '二', '三', '四', '五', '六'][day];
    },
    chineseNumber (n) {
        return ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][n - 1] || n;
    },
    numberFormat (n) {
        return (n < 10 ? '0' : '') + n;
    },
    timeFormat (hour, minute, second) {
        if (second === undefined) { second = minute; minute = hour; hour = undefined; }
        return (hour === undefined ? '' : (hour < 10 ? '0' : '') + hour + ':') + (minute < 10 ? '0' : '') + minute + ':' + (second < 10 ? '0' : '') + second;
    },
    createDateData (now) {
        const date = {};
        const iy = now.year(), im = now.month() + 1, id = now.date();
        for (let y = iy; y <= iy + 1; y++) {
            const month = {};
            const mm = [0, 31, (!(y % 4) & (!!(y % 100))) | (!(y % 400)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            const iim = (y == iy) ? im : 1;
            for (let m = iim; m <= 12; m++) {
                const day = [];
                const iid = (y == iy && m == im) ? id : 1;
                for (let d = iid; d <= mm[m]; d++) {
                    day.push(d + '日');
                }
                month[m + '月'] = day;
            }
            date[y + '年'] = month;
        }
        return date;
    },
    // 获取生日
    createBirthdayData (now) {
        const date = {};
        const iy = now.year(), im = now.month() + 1, id = now.date();
        for (let y = 1916; y <= iy; y++) {
            const month = {};
            const mm = [0, 31, (!(y % 4) & (!!(y % 100))) | (!(y % 400)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            const iim = (y == iy) ? im : 12;
            for (let m = 1; m <= iim; m++) {
                const day = [];
                const iid = (y == iy && m == im) ? id : mm[m];
                for (let d = 1; d <= iid; d++) {
                    day.push(d + '日');
                }
                month[m + '月'] = day;
            }
            date[y + '年'] = month;
        }
        return date;
    },
    getVisibleText (text, n) {
        let realLength = 0, len = text.length, preLen = -1, charCode = -1, needCut = false;
        for (let i = 0; i < len; i++) {
            charCode = text.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            if (preLen === -1 && realLength >= n) {
                preLen = i + 1;
            } else if (realLength > n + 2) {
                needCut = true;
                break;
            }
        }
        if (needCut) {
            text = text.substr(0, preLen) + '..';
        }
        return text;
    },
    cutLimitText (text, n) {
        let realLength = 0, len = text.length, preLen = -1, charCode = -1, needCut = false;
        for (let i = 0; i < len; i++) {
            charCode = text.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            if (preLen === -1 && realLength >= n) {
                preLen = i + 1;
            } else if (realLength > n) {
                needCut = true;
                break;
            }
        }
        if (needCut) {
            text = text.substr(0, preLen);
        }
        return text;
    },
    getCurrentDateString () {
        return moment().format('YYYY年MM月DD日');
    },
    getCurrentTimeString () {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    },
    getJetlagString (str) {
        const now = moment();
        const time = moment(str);
        let sec = now.diff(time, 'seconds');
        let ret;
        if (sec < 3600 * 24) {
            let min = Math.floor(sec / 60);
            sec -= min * 60;
            const hour = Math.floor(min / 60);
            min -= hour * 60;
            ret = ((hour ? hour + '小时' : '') + (min ? min + '分钟前' : '')) || '刚刚';
        } else {
            ret = time.format('YYYY-MM-DD HH:mm:ss');
        }
        return ret;
    },
    getStrlen (str) {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
            const c = str.charCodeAt(i);
            // 单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
                len++;
            } else {
                len += 2;
            }
        }
        return len;
    },
    checkPhone (phone) {
        return /^1\d{10}$/.test(phone);
    },
    checkPassword (pwd) {
        return /^[\d\w_]{6,20}$/.test(pwd);
    },
    checkVerificationCode (code) {
        return /^\d{6}$/.test(code);
    },
    checkNumberCode (code) {
        return /^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(code);
    },
    checkBankCardCode (code) {
        return /^(\d{16}|\d{19})$/.test(code);
    },
    checkEmailCode (code) {
        const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (re.test(code)) {
            return true;
        } else {
            return false;
        }
    },
};
