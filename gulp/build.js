'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var webpack = require('webpack-stream');
var critical = require('critical');
var $ = require('gulp-load-plugins')();

var paths = require('./config/gulp-paths.json');



/**
 * HTML
 */

gulp.task('build:html', ['metalsmith', 'dist:css'], function() {
  return gulp.src(paths.dist + '**/*.html')
    .pipe($.inlineSource())
    .pipe(gulp.dest(paths.build));
});

gulp.task('build:tpl', function() {
  return gulp.src(paths.dist + '**/*.tpl')
    .pipe(gulp.dest(paths.build));
});



/**
 * JavaScript
 */

gulp.task('webpack', function() {
  return gulp.src(paths.js.src + 'main.js')
    .pipe(webpack(require('./config/webpack.config.js')))
    .pipe(gulp.dest(paths.js.dist))
    .pipe($.size());
});

gulp.task('dist:js', function() {
  return gulp.src(paths.js.src + '{loadCss,redirect}.js')
    .pipe($.uglify())
    .pipe(gulp.dest(paths.js.dist));
});

gulp.task('build:js', function() {
  return gulp.src(paths.js.dist + 'main.js')
    .pipe(gulp.dest(paths.js.build));
});



/**
 * LESS
 */

gulp.task('dist:less', function() {
  return gulp.src(paths.less.src + 'main.less')
    .pipe($.plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.less.dist))
    .pipe($.size());
});



/**
 * CSS
 */

// criticalがwerckerでエラーを吐くのでローカルで出力しておく
gulp.task('critical', ['metalsmith', 'dist:less'], function(cb) {
  critical.generate({
    base: paths.dist,
    src: 'index.html',
    dest: 'styles/critical.css',
    width: 320,
    height: 480,
    minify: true
  }, function(err, output) {
    if (err) {
      console.log(err);
    }

    cb();
  });
});

gulp.task('generate:critical', ['critical'], function() {
  return gulp.src(paths.css.dist + 'critical.css')
    .pipe(gulp.dest(paths.assets.src + 'styles/'))
    .pipe($.size());
});

gulp.task('dist:css', function() {
  return gulp.src(paths.assets.src + 'styles/**/*.css')
    .pipe(gulp.dest(paths.css.dist))
    .pipe($.size());
});

gulp.task('build:css', function() {
  return gulp.src(paths.css.dist + 'main.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest(paths.css.build))
    .pipe($.size());
});



/**
 * Build
 */

gulp.task('dist', ['clean:dist'], function(cb) {
  runSequence(
    ['generate:critical', 'webpack', 'dist:assets', 'dist:js'], cb
  );
});

gulp.task('build', ['clean'], function(cb) {
  runSequence(
    ['build:html', 'dist:less', 'webpack', 'dist:js'],
    ['build:tpl', 'build:js', 'build:css', 'build:assets'],
    cb
  );
});



/**
 * Assets
 */

gulp.task('dist:assets', function() {
  return gulp.src(paths.assets.src + '**/*')
    .pipe(gulp.dest(paths.assets.dist))
});

gulp.task('build:assets', function() {
  return gulp.src(paths.assets.src + '**/*')
    .pipe(gulp.dest(paths.assets.build))
});
