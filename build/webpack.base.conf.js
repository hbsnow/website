'use strict'

const path = require('path')

const resolve = dir => path.join(__dirname, '../', dir)

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    main: './src/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../docs/assets/js/'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      components: path.join(__dirname, 'src/js/components')
    }
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
  }
}
