'use strict'

const path = require('path')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')

const resolve = dir => path.join(__dirname, '../', dir)

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    'assets/js/main': './src/assets/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../docs/'),
    filename: '[name].js',
    publicPath: '/'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: resolve('src'),
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve('src')
      }
    ]
  },
  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, '../src/assets/js/sw.js')
      // Service-Worker-Allowedの設定ができるならassetsの中にいれたい
      // publicPath: '/assets/js/'
    })
  ]
}
