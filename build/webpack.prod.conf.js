'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  plugins: [
    // IDの生成 (recommended for production)
    // Scope Hoisting を有効化する
    new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: { ecma: 8, output: { comments: false, beautify: false } },
      parallel: true
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
})
