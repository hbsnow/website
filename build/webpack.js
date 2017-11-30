'use strict'

const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

webpack(webpackConfig, (err, stats) => {
  if (err) throw err

  if (stats.hasErrors()) {
    console.log('Build failed with errors.')
    process.exit(1)
  }

  console.log('Build complete.')
})
