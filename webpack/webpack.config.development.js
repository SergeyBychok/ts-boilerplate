const webpack = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.config.base')
const { resolve } = require('path')

const development = merge(base, {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index'],
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[name].chunk.js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: resolve(__dirname, '../public'),
    publicPath: '/',
    open: false,
    compress: true,
    hot: true,
    port: 3000,
  },
  optimization: {
    noEmitOnErrors: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})

module.exports = development
