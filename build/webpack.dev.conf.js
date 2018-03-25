'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '8080',
    open: false,
    overlay: false,
    contentBase: path.join(__dirname, '../docs/'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    // IDの生成 (recommended for development)
    new webpack.NamedModulesPlugin(),

    new webpack.NoEmitOnErrorsPlugin()
  ]
})
