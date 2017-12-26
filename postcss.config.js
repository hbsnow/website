module.exports = ctx => {
  return {
    plugins: [
      require('postcss-import')(),
      require('autoprefixer')([
        'last 1 Chrome versions',
        'last 1 and_chr versions',
        'last 1 ff versions',
        'last 1 Edge versions',
        'last 1 Safari versions',
        'last 1 ios_saf versions'
      ]),
      require('cssnano')({
        'postcss-discard-unused': true,
        'postcss-merge-idents': true,
        'postcss-reduce-idents': true,
        'z-index': true
      })
    ]
  }
}
