'use strict'

const gulp = require('gulp')
const webp = require('gulp-webp')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const mozjpeg = require('imagemin-mozjpeg')
const sourcemaps = require('gulp-sourcemaps')
const eslint = require('gulp-eslint')
const postcss = require('gulp-postcss')
const filter = require('gulp-filter')
const gulpIf = require('gulp-if')
const uglifyes = require('uglify-es')
const composer = require('gulp-uglify/composer')
const minify = composer(uglifyes, console)
const pump = require('pump')
const runSequence = require('run-sequence')

const isProduction = process.env.NODE_ENV === 'production'

gulp.task('build:css', cb => {
  pump(
    [
      gulp.src('src/assets/css/**/*.css'),
      postcss({ modules: true }),
      filter(['**', '!**/_*.css']),
      gulp.dest('docs/assets/css')
    ],
    cb
  )
})

gulp.task('build:js', cb => {
  pump(
    [
      gulp.src('src/sw.js'),
      gulpIf(!isProduction, sourcemaps.init()),
      eslint(),
      eslint.format(),
      minify(),
      gulpIf(!isProduction, sourcemaps.write()),
      gulp.dest('docs')
    ],
    cb
  )
})

gulp.task('build:image', () => {
  return gulp
    .src(['src/+(assets)/**/*.+(png|jpg|svg)', 'src/html/**/*.+(png|jpg|svg)'])
    .pipe(
      imagemin([
        pngquant({ quality: '70-80', speed: 1 }),
        mozjpeg({ quality: 70, progressive: true }),
        imagemin.svgo(),
        imagemin.optipng()
      ])
    )
    .pipe(gulp.dest('docs'))
    .pipe(filter(['**', '!**/*.svg']))
    .pipe(webp())
    .pipe(gulp.dest('docs'))
})

gulp.task('copy', () => {
  return gulp
    .src([
      'src/assets/**/*.{txt,xml,json}',
      'src/assets/**/README.md',
      'src/assets/**/CNAME',
      'src/assets/**/{ga}.js'
    ])
    .pipe(gulp.dest('docs/assets'))
})

gulp.task('watch', ['build'], () => {
  gulp.watch('src/assets/css/**/*.css', ['build:css'])
  gulp.watch('src/sw.js', ['build:js'])
})

gulp.task('build', cb => {
  runSequence(['build:image', 'copy', 'build:css', 'build:js'], cb)
})
