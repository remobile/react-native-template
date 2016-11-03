var multer = require('multer');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

const PER_COUNT = 10;
const TEXT = 'fangyunjiang\n:::9::8::7:方运江2342342342342342342342342342342342342342342342343\n';
let MESSAGE = {
    avatar: 'http://localhost:3000/image/1.png',
    name: '阿三',
};
const TIME1 = '2016-11-02 12:11:00';
const TIME2 = '2016-10-05 11:11:11';

module.exports = (function() {
    function Mgr() {}
    Mgr.prototype.register = function(app) {
        app.subPost('/getMessageList', function (res, data) {
            var {pageNo} = data;
            if (pageNo <= 2) {
                var list = [];
                for (var i=0; i< (pageNo<=2 ? PER_COUNT : 3); i++) {
                    var item = Object.assign({}, MESSAGE, {text: TEXT+pageNo+i, send: _.random(0, 1), time: ((i&3) ? TIME1: TIME2)});
                    list.push(item);
                }
                app.sendObj(res, {success:true, list});
            } else {
                app.sendObj(res, {success:true, list:[]});
            }
        });
    };

    return new Mgr();
})();
