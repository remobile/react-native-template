module.exports = (function() {
    var crypto = require('crypto')
    function DES() {
    }
    DES.prototype.encode = function(text, key) {
        var cipher = crypto.createCipheriv('des-ecb', key, new Buffer(0));
        var ciph = cipher.update(text, 'utf8', 'base64');
        ciph += cipher.final('base64');
        return ciph;
    };
    DES.prototype.decode = function(code, key) {
        var decipher = crypto.createDecipheriv('des-ecb', key, new Buffer(0));
        var txt = decipher.update(code, 'base64', 'utf8');
        txt += decipher.final('utf8');
        return txt;
    };

    return new DES();
})();


