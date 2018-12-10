---
title: PostCSS の設定ファイル
tags: postcss, sass
description: PostCSS の設定ファイル。
datePublished: 2018-04-08
dateModified: 2018-05-29
---

PostCSS のビルドでは [PostCSS CLI](https://github.com/postcss/postcss-cli) を使わず、gulp-postcss を使います。理由は後述。

```gulpfile.js
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const filter = require('gulp-filter')
const pump = require('pump')

gulp.task('build:css', cb => {
  pump(
    [
      gulp.src('src/**/*.css'),
      postcss({ modules: true }),
      filter(['**', '!**/_*.css']),
      gulp.dest('docs')
    ],
    cb
  )
})
```

Sass のように `@import` されるファイルには prefix として `_` をつけて、出力しないような処理をしています。

出力したいファイルを `src/main.css` のように決め打ちしてしまうと、`@import` したファイルを [doiuse](https://github.com/anandthakker/doiuse) や [stylelint](https://github.com/stylelint/stylelint) にかけることができません。[postcss-import](https://github.com/postcss/postcss-import) で結合後に LINT を実行することは可能ですが、結合してしまったあとでは、レポートされる行数が当然結合後の行数を示すことになり、使い物になりません。PostCSS CLI を使わないのはこれが理由です。

```.postcssrc.js
const path = require('path')

module.exports = ctx => {
  const file = path.parse(ctx.file.path)

  // ファイル名が `_` から始まるものを判定し、
  // trueであればpostcss-import以降を実行しない
  const isPartial = file.name.startsWith('_')

  return {
    map: ctx.env !== 'production',
    plugins: Object.assign(
      {},
      {
        doiuse: {
          // なぜか一つ設定をいれておかないと.browserslistrcを読み込まない
          ignore: []
        },
        stylelint: {},
        'postcss-reporter': {
          clearReportedMessages: true
        }
      },
      isPartial
        ? {}
        : {
            'postcss-import': {},
            'postcss-flexbugs-fixes': {},
            'postcss-gap-properties': {},
            autoprefixer: {
              grid: true
            },
            cssnano: {
              'postcss-discard-unused': true,
              'postcss-merge-idents': true,
              'postcss-reduce-idents': true,
              'z-index': true
            }
          }
    )
  }
}
```

使用するプラグインは以下の通り。

- [doiuse](https://github.com/anandthakker/doiuse)
- [stylelint](https://github.com/stylelint/stylelint)
- [postcss-reporter](https://github.com/postcss/postcss-reporter)
- [postcss-import](https://github.com/postcss/postcss-import)
- [postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [cssnano](http://cssnano.co/)

フォーマッタには [prettier](https://github.com/prettier/prettier) を使うので、PostCSS ではフォーマットをしていません。

doiuse についてはコメントアウトでも書いていますが、何故か一つでも何かしらの設定がないと、`.browserslistrc` の設定を読み込んでくれないので注意が必要です(そのうち修正されると思いますが……)。
