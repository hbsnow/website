'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var critical = require('critical');
var $ = require('gulp-load-plugins')();

var paths = require('./config/gulp-paths.json');

var processors = [
  require('postcss-import'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-mixins'),
  require('postcss-extend'),
  require('postcss-color-function'),
  require('postcss-calc'),
  require('autoprefixer')
];



/**
 * HTML
 */

gulp.task('dist:jade', function() {
  return gulp.src(paths.jade.src + '*.jade')
    .pipe($.jade())
    .pipe(gulp.dest(paths.dist))
    .pipe($.size());
});

gulp.task('build:html', ['dist:code', 'dist:jade', 'dist:js'], function() {
  return gulp.src(paths.dist + '**/*.html')
    .pipe($.inlineSource())
    .pipe(gulp.dest(paths.build))
    .pipe($.size());
});



/**
 * JavaScript
 */

gulp.task('dist:js', function() {
  return gulp.src(paths.js.src + '{loadCss,redirect}.js')
    .pipe($.uglify())
    .pipe(gulp.dest(paths.js.dist))
    .pipe($.size());
});



/**
 * CSS
 */

// criticalがwerckerでエラーを吐くのでローカルで出力しておく
gulp.task('critical', ['dist:jade', 'dist:css'], function(cb) {
  critical.generate({
    base: paths.dist,
    src: 'index.html',
    css: [paths.dist + 'styles/main.css'],
    dest: '../assets/styles/critical.css',
    dimensions: [{
      width: 320,
      height: 480,
    }, {
      width: 1300,
      height: 900
    }],
    minify: true
  }, function(err, output) {
    if (err) {
      console.log(err);
    }

    cb();
  });
});

gulp.task('dist:css', function() {
  return gulp.src(paths.css.src + 'main.css')
    .pipe($.plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe($.sourcemaps.init())
    .pipe($.postcss(processors))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.css.dist))
    .pipe($.size());
});

gulp.task('build:css', function() {
  processors.push(require('cssnano'));
  processors.push(require("css-mqpacker"));

  return gulp.src(paths.css.src + 'main.css')
    .pipe($.postcss(processors))
    .pipe(gulp.dest(paths.css.build))
    .pipe($.size());
});



/**
 * Assets
 */

gulp.task('dist:assets', function() {
  return gulp.src(paths.assets.src + '**/*')
    .pipe(gulp.dest(paths.assets.dist))
    .pipe($.size());
});

gulp.task('dist:code', function() {
  return gulp.src(paths.assets.src + '**/{scripts,styles}/*')
    .pipe(gulp.dest(paths.assets.dist))
    .pipe($.size());
});

gulp.task('build:assets', function() {
  return gulp.src(paths.assets.src + '**/*')
    .pipe(gulp.dest(paths.assets.build))
    .pipe($.size());
});



/**
 * Build
 */

gulp.task('dist', ['clean:dist'], function(cb) {
  runSequence(
    ['dist:jade', 'dist:css', 'dist:js', 'dist:assets'], cb
  );
});

gulp.task('build', ['clean'], function(cb) {
  runSequence(
    ['build:assets'],
    ['build:html', 'build:css'],
    cb
  );
});