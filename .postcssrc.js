const path = require('path')

module.exports = (ctx) => {
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
          ignore: [],
        },
        stylelint: {},
        'postcss-reporter': {
          clearReportedMessages: true,
        },
      },
      isPartial
        ? {}
        : {
            'postcss-import': {},
            autoprefixer: {},
            cssnano: {
              'postcss-discard-unused': true,
              'postcss-merge-idents': true,
              'postcss-reduce-idents': true,
              'z-index': true,
            },
          }
    ),
  }
}
