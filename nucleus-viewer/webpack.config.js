const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = undefined
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
    new UglifyJsPlugin({test: /\.js$/}),
    new webpack.LoaderOptionsPlugin({minimize: true})
  ])
}
