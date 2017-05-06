const express = require('express');
const http = require('http');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

// webpack
if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig), {
    // noInfo: true
  }));
}

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: '*/*' })); // any incoming request regardless of type will be parsed as json

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

routes(app);
