var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var des = require('./utils/des.js');
var deskey = "ABCDEFGH";

var app = express();

app.TIMEOUT = 100;
var modules = [
    'main',
    'chat',
];

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.send = function(res, str) {
    setTimeout(function() {
        console.log("send:", str);
        res.send(des.encode(str, deskey));
    }, app.TIMEOUT);
};

app.sendFile = function(res, filename) {
    app.send(res, fs.readFileSync(filename, 'utf8'));
};

app.sendObj = function(res, obj) {
    app.send(res, JSON.stringify(obj));
};

app.subPost = function(url, callback) {
    app.post('/JFBSample/api'+url, function(req, res) {
        try {
            var data = JSON.parse(des.decode(req.body, deskey));
            console.log("recv:", data);
            callback(res, data);
        } catch (e) {
            app.sendObj(res, {success: false, msg: '参数不正确'});
        }
    });
};

for (var i in modules) {
    require('./modules/'+modules[i]).register(app);
}

app.listen(3000, function() {
    console.log("server listen on: http://localhost:3000");
});
