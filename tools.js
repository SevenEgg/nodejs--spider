var request = require("request");
var zlib = require("zlib");

var cookie = null;

var headersGet = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Cookie': cookie,
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/53.0.2785.143 Chrome/53.0.2785.143 Safari/537.36'
};
var headersPost = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': cookie,
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/53.0.2785.143 Chrome/53.0.2785.143 Safari/537.36'
}

exports.get = function (url, cookie, callback) {
    request.get({
        url: url,
        headers: headersGet,
        timeout: 30000,
        encoding: null
    }, function (err, response, data) {
        if (!err && response.statusCode == 200) {
            var buffer = Buffer.from(data);
            var encoding = response.headers['content-encoding'];
            if (encoding == 'gzip') {
                zlib.gunzip(buffer, function (err, decode) {
                    callback(err && console.log('unzip err: ' + err), decode && decode.toString());
                });
            } else if (encoding == 'deflate') {
                zlib.inflate(buffer, function (err, decode) {
                    callback(err && console.log('deflate err' + err), decode && decode.toString());
                });
            } else {
                callback(null, buffer.toString());
            }
        } else {
            callback(err || response.statusCode);
        }
    });
};

exports.post = function (url, cookie, auth, callback) {
    request.post({
        url: url,
        headers: headersPost,
        timeout: 30000,
        encoding: null,
        auth: auth
    }, function (err, response, data) {
        if (!err && response.statusCode == 200) {
            var buffer = Buffer.from(data);
            var encoding = response.headers['content-encoding'];
            if (encoding == 'gzip') {
                zlib.gunzip(buffer, function (err, decode) {
                    callback(err && console.log('unzip err: ' + err), decode && decode.toString());
                });
            } else if (encoding == 'deflate') {
                zlib.inflate(buffer, function (err, decode) {
                    callback(err && console.log('deflate err' + err), decode && decode.toString());
                });
            } else {
                callback(null, buffer.toString());
            }
        } else {
            callback(err || response.statusCode);
        }
    });
};

exports.postFrom = function (url, auth, callback) {
    request.post({
        url: url,
        headers: headersPost,
        timeout: 30000,
        encoding: null,
        form: auth
    }, function (err, response, data) {
        if (!err && response.statusCode == 200) {
            var buffer = Buffer.from(data);
            var encoding = response.headers['content-encoding'];
            if (encoding == 'gzip') {
                zlib.gunzip(buffer, function (err, decode) {
                    callback(err && console.log('unzip err: ' + err), decode && decode.toString());
                });
            } else if (encoding == 'deflate') {
                zlib.inflate(buffer, function (err, decode) {
                    callback(err && console.log('deflate err' + err), decode && decode.toString());
                });
            } else {
                callback(null, buffer.toString());
            }
        } else {
            callback(err || response.statusCode);
        }
    });
};