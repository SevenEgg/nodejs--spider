var request = require("request");
var zlib = require("zlib");

exports.get = function (url, cookie, callback) {
    request.get({
        url: url,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, sdch, br',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Cookie': cookie,
            'Host': 'www.shanbay.com',
            'Referer': 'https://www.shanbay.com/wordbook/books/mine/',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/53.0.2785.143 Chrome/53.0.2785.143 Safari/537.36'
        },
        timeout: 30000,
        encoding: null
    }, function (err, response, data) {
        if (!error && response.statusCode == 200) {
            var buffer = Buffer.from(data);
            var encoding = response.headers['Content-Encoding'];
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

exports.post = function (url, cookie, body, callback) {
    request.post({
        url: url,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': cookie,
            'Host': 'www.shanbay.com',
            'Origin': 'https://www.shanbay.com',
            'Referer': 'https://www.shanbay.com/accounts/login/',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/53.0.2785.143 Chrome/53.0.2785.143 Safari/537.36'
        },
        timeout: 30000,
        encoding: null,
        body: body
    }, function (err, response, data) {
        if (!error && response.statusCode == 200) {
            var buffer = Buffer.from(data);
            var encoding = response.headers['Content-Encoding'];
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