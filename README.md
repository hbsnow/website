# hbsnow.github.io

[![Build Status](https://travis-ci.org/hbsnow/website.svg?branch=master)](https://travis-ci.org/hbsnow/website)

## 規約

### 画像

- 画像の元データは、`png, jpg` のいずれかであること。

## TODO

- CSS
- feed, sitemap.xml の出力
- ampページの layouts

module.exports = ctx => {
  console.log(ctx)

  return {
    plugins: [
      require('doiuse')({
        browsers: [
          'last 2 Chrome versions',
          'last 2 and_chr versions',
          'last 2 ff versions',
          'last 2 Edge versions',
          'last 1 Safari versions',
          'last 1 ios_saf versions'
        ],
        ignoreFiles: ['normalize.css']
      }),
      require('postcss-import')(),
      require('autoprefixer')(),
      require('cssnano')({
        'postcss-discard-unused': true,
        'postcss-merge-idents': true,
        'postcss-reduce-idents': true,
        'z-index': true
      })
    ]
  }
}
