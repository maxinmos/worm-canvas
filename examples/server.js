var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function (req, res) {
  if (req.url === '/bundle.js') {
    fs.createReadStream(path.resolve(__dirname, './bundle.js'))
      .pipe(res);
  }
  else {
    res.writeHead(200, {
        'Content-Type': 'text/html'
      });

    fs.createReadStream(path.resolve(__dirname, './index.html'))
      .pipe(res);
  }
});

server.listen(3000, function (err) {
  if (err) { console.log(err); }
  else { console.log('Start'); }
});
