var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: [
    path.join(__dirname, '/src/index')
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: ['awesome-typescript-loader'],
    }, {
      test: /\.css?$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: ['file-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html')
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  }
};
