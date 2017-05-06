const express = require('express');
const morgan = require('morgan'); // logging framework
const http = require('http');
const routes = require('./routes');

const app = express();
routes(app);

const server = http.createServer(app);
const port = parseInt(process.env.PORT, 10) || 3000;

app.set('port', port);

server.listen(port, function(err) {
  if (err) {
    console.log('error', err);
  } else {
    console.log(`Server (${process.env.NODE_ENV || 'development'}) is running at localhost:${port}`);
  }
});
