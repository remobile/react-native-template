var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
// var contentType = require('content-type');
// var getRawBody = require('raw-body');
// var qs = require('qs');

// var des = require('./utils/des.js');
var des = {
    encode: (text, key)=>(text),
    decode: (code, key)=>(code),
};

var deskey = "SV#Y!jAz";
var app = express();

app.TIMEOUT = 100;
var modules = [
    'main',
];

app.use(express.static(__dirname + '/public'));

// app.use(function (req, res, next) {
//     getRawBody(req, {
//         length: req.headers['content-length'],
//         limit: '200mb',
//         encoding: contentType.parse(req).parameters.charset
//     }, function (err, string) {
//         if (err) return next(err)
//         req.text = string
//         req.body = qs.parse(req.text.toString());
//         next()
//     })
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.send = function(req, res, str) {
    console.log("recv:", des.decode(req.body, deskey));
    setTimeout(function() {
        // console.log("send:", str);
        res.send(des.encode(str, deskey));
    }, app.TIMEOUT);
};

app.sendFile = function(req, res, filename) {
    app.send(req, res, fs.readFileSync(filename, 'utf8'));
};

app.sendObj = function(req, res, obj) {
    app.send(req, res, JSON.stringify(obj));
};

app.subPost = function(url, callback) {
    app.post('/JFBSample/api'+url, callback);
};

for (var i in modules) {
    require('./modules/'+modules[i]).register(app);
}

app.listen(3000, function() {
    console.log("server listen on: http://localhost:3000");
});
