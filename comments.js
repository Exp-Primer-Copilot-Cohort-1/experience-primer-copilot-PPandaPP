// create web server
// 1. load the http module
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = [];

http.createServer(function(req, res) {
  // 2. send http header
  // http status: 200 : OK
  // content type: text/plain
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // 3. send response body
  var url_parts = url.parse(req.url, true);
  if (url_parts.pathname == '/') {
    // show the form
    res.end(fs.readFileSync('form.html'));
  } else if (url_parts.pathname == '/comment') {
    // save the comment and show comments
    var comment = qs.parse(url_parts.query).comment;
    comments.push(comment);
    res.end(comments.join('\n'));
  } else {
    res.end('invalid request');
  }
}).listen(8080);

// log message
console.log('Server running at http://