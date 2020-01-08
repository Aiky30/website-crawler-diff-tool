var http = require('http');
var express = require('express');
var path = require('path');

var routeHome = require('./src/routes/home')
var routeDiff = require('./src/routes/diff')

var app = express();

app.use('/', routeHome);
app.use('/diff', routeDiff);

app.use('/js', express.static(path.join(__dirname, 'src/client/public')));

var server = http.createServer(app);

server.listen(3000, function() {
  console.log('Server is listening at 3000');
});