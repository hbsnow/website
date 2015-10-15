'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var paths = require('./config/gulp-paths.json');



gulp.task('watch:jade', ['dist:jade'], function() {
  gulp.watch(paths.jade.src + '**/*.jade', ['dist:jade']);
});

gulp.task('watch:css', ['dist:css'], function() {
  gulp.watch(paths.css.src + '**/*.css', ['dist:css']);
});

gulp.task('watch', ['serve', 'dist:assets', 'dist:js', 'watch:jade', 'watch:css']);