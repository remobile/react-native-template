var multer = require('multer');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

const PER_COUNT = 10;
let MESSAGE = {
    avatar: 'http://localhost:3000/image/1.png',
    name: '阿三',
    text: 'fangyunjiang\n:::9::8::7:方运江2342342342342342342342342342342342342342342342343\n12123',
    time: '2016-09-04 12:11:00',
};

module.exports = (function() {
    function Mgr() {}
    Mgr.prototype.register = function(app) {
        app.subPost('/getMessageList', function (res, data) {
            var {pageNo} = data;
            if (pageNo <= 2) {
                var list = [];
                for (var i=0; i< (pageNo<=2 ? PER_COUNT : 3); i++) {
                    list.push(Object.assign({text: MESSAGE.text+pageNo+i, send: _.random(0, 1)}, MESSAGE));
                }
                app.sendObj(res, {success:true, list});
            } else {
                app.sendObj(res, {success:true, list:[]});
            }
        });
    };

    return new Mgr();
})();
