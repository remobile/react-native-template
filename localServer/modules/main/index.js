var multer = require('multer');
var path = require('path');
var fs = require('fs');

module.exports = (function() {
    function Mgr() {}
    Mgr.prototype.register = function(app) {
        app.subPost('/login', function (req, res) {
            app.sendFile(req, res, __dirname+'/login.json');
        });
        app.subPost('/register', function (req, res) {
            app.sendFile(req, res, __dirname+'/register.json');
        });
        app.subPost('/retrievePassword', function (req, res) {
            app.sendFile(req, res, __dirname+'/retrievePassword.json');
        });
        app.subPost('/modifyPassword', function (req, res) {
            app.sendFile(req, res, __dirname+'/modifyPassword.json');
        });
        app.subPost('/getPersonalInfo', function (req, res) {
            app.sendFile(req, res, __dirname+'/getPersonalInfo.json');
        });
        app.subPost('/updatePersonalInfo', function (req, res) {
            app.sendFile(req, res, __dirname+'/updatePersonalInfo.json');
        });
        app.subPost('/submitFeedback', function (req, res) {
            app.sendFile(req, res, __dirname+'/submitFeedback.json');
        });
        app.subPost('/getSupervisionList', function (req, res) {
            app.sendFile(req, res, __dirname+'/getSupervisionList.json');
        });
        app.subPost('/submitReport', function (req, res) {
            app.sendFile(req, res, __dirname+'/submitReport.json');
        });
        app.post('/app/api/uploadMediaFile', multer({dest: 'public/medias/'}).single('file'), function (req, res) {
            // var extname = path.extname(req.file.originalname);
            // fs.renameSync(req.file.path, req.file.path+extname);
            fs.renameSync(req.file.path, 'public/medias/'+req.file.originalname);
            var obj =  {
                'success': true,
                'msg': '获取数据成功',
                'context': {
                    // 'url':'http://localhost:3000'+req.file.path.replace('public', '')
                    'url':'http://localhost:3000/medias/'+req.file.originalname
                }
            };
            console.log(obj);
            app.sendObj(req, res, obj);
        });
    };

    return new Mgr();
})();
