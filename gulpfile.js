'use strict'

const gulp = require('gulp')
const webp = require('gulp-webp')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const mozjpeg = require('imagemin-mozjpeg')
const postcss = require('gulp-postcss')
const cached = require('gulp-cached')
const remember = require('gulp-remember')
const runSequence = require('run-sequence')

gulp.task('image', () => {
  return gulp.src([
      'src/+(assets)/**/*.+(png|jpg|svg)',
      'src/html/**/*.+(png|jpg|svg)'
    ])
    .pipe(imagemin([
        pngquant({
          quality: '70-80',
          speed: 1
        }),
        mozjpeg({
          quality: 70,
          progressive: true
        }),
        imagemin.svgo(),
        imagemin.optipng()
      ]))
    .pipe(gulp.dest('docs'))
})

gulp.task('webp', () => {
  return gulp.src([
      'src/+(assets)/**/*.+(png|jpg)',
      'src/html/**/*.+(png|jpg)'
    ])
    .pipe(webp())
    .pipe(gulp.dest('docs'))
})

gulp.task('copy', () => {
  return gulp.src([
    'src/assets/**/*.{txt,xml,json}',
    'src/assets/**/README.md',
    'src/assets/**/CNAME'
  ])
    .pipe(gulp.dest('docs/assets'))
})

gulp.task('build:assets', cb => {
  runSequence(['image', 'webp'], cb)
})

gulp.task('lint:css', () => {
  const plugins = [
    require('doiuse')({
      browsers: [
        'last 2 Chrome versions',
        'last 2 and_chr versions',
        'last 2 ff versions',
        'last 2 Edge versions',
        'last 1 Safari versions',
        'last 1 ios_saf versions'
      ]
    })
  ]

  return gulp.src('src/assets/**/*.css')
    .pipe(cached('css-lint-cache'))
    .pipe(postcss(plugins))
    .pipe(remember('css-lint-cache'))
})

gulp.task('watch:lint:css', ['lint:css'], () => {
  gulp.watch('src/assets/css/**/*.css', ['lint:css'])
})
