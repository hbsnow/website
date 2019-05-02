'use strict'

const path = require('path')

const resolve = (dir) => path.join(__dirname, '../', dir)

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: { 'assets/js/main': './src/assets/js/main.ts' },
  output: {
    path: path.resolve(__dirname, '../docs/'),
    filename: '[name].js',
    publicPath: '/',
  },
  target: 'web',
  resolve: { extensions: ['.ts', '.js', '.json'] },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: resolve('src'),
      },
      { test: /\.ts$/, loader: 'ts-loader', include: resolve('src') },
      { test: /\.json$/, loader: 'json-loader', include: resolve('src') },
      { test: /\.pug$/, loader: 'pug-loader', include: resolve('src') },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
}
