'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: {
        ecma: 8,
        output: {
          comments: false,
          beautify: false
        }
      },
      parallel: true
    }),

    // IDの生成 (recommended for production)
    new webpack.HashedModuleIdsPlugin(),

    // Scope Hoisting を有効化する
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
})
