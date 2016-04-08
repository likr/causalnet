/* eslint-env node */

var path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-react-jsx'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?localIdentName=[path][name]---[local]---[hash:base64:5]&modules'],
      },
    ],
  },
  entry: {
    bundle: './src/index',
    'layout-worker': './src/workers/layout-worker',
  },
  output: {
    path: path.join(__dirname, 'app'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devtool: '#inline-source-map',
};
