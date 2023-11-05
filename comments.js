// Create web server
// run: node comments.js
// open browser: http://localhost:3000

var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');

var comments = new Object();
comments['John Doe'] = 'Hello World';
comments['Jane Doe'] = 'Hi, there!';
comments['Jack Doe'] = 'How are you?';

var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true, false);
    var pathname = urlObj.pathname;
    var query = urlObj.query;
    if (pathname == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body>');
        res.write('<h1>Comments</h1>');
        res.write('<ul>');
        for (var name in comments) {
            res.write('<li>' + name + ': ' + comments[name] + '</li>');
        }
        res.write('</ul>');
        res.write('<form method="post">');
        res.write('Name: <input type="text" name="name"><br>');
        res.write('Comment: <textarea name="comment"></textarea><br>');
        res.write('<input type="submit" value="Submit">');
        res.write('</form>');
        res.write('</body></html>');
        res.end();
    } else if (pathname == '/comment') {
        if (req.method == 'POST') {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var post = qs.parse(body);
                comments[post.name] = post.comment;
                res.writeHead(302, { 'Location': '/' });
                res.end();
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end();
        }
    } else if (pathname == '/reset') {
        if (req.method == 'POST') {
            comments = new Object();
            res.writeHead(302, { 'Location': '/' });
            res.end();
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end();
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end();
    }
});