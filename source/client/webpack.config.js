var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

  join = path.join.bind(path, __dirname);


var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        exclude: /node_modules/,
        include : APP_DIR,
        query: {
        presets: [ 'es2015', 'react' ]
      },
        loader : 'babel'
      }
    ],
    plugins: [commonsPlugin]
  }

};
module.exports = config;