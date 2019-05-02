'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: true,
  },
  plugins: [
    // IDの生成 (recommended for production)
    // Scope Hoisting を有効化する
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
})
