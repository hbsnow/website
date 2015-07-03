'use strict';

var gulp = require('gulp');
var objectAssign = require('object-assign');
var runSequence = require('run-sequence');
var webpack = require('webpack-stream');
var $ = require('gulp-load-plugins')();

var paths = require('./config/gulp-paths.json');



gulp.task('watch:js', function() {
  var config = objectAssign(require('./config/webpack.config.js'), {
    watch: true,
    devtool: '#inline-source-map'
  });

  return gulp.src(paths.js.src + 'main.js')
    .pipe(webpack(config))
    .pipe(gulp.dest(paths.js.dist));
});

gulp.task('watch:less', ['dist:less'], function() {
  gulp.watch(paths.less.src + '**/*.less', ['dist:less']);
});

gulp.task('watch', ['serve', 'dist:js', 'watch:js', 'watch:less']);
