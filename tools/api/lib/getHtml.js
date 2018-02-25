var fs = require("fs");
var path = require("path");
var jsdom = require("jsdom/lib/old-api");
var jquery = fs.readFileSync(path.join(__dirname,'jquery.js')).toString();
var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0';
var args = process.argv.splice(2);

console.log('正在生成html文档，请耐心等待...');
jsdom.env({
    url: args[0],
    headers: { 'User-Agent': userAgent },
    src: [jquery],
    done: function (errors, window) {
        var $ = window.$;
        var str = fs.readFileSync(path.join(__dirname,'tpl.html'), 'utf-8');
        str = str.replace('---article---', $('#readme').html());
        fs.writeFileSync(path.join(__dirname, 'api.html'), str);
        console.log('生成html文档成功');
    },
});
