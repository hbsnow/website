'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var paths = require('./config/gulp-paths.json');



gulp.task('serve', function() {
  return gulp.src(paths.dist)
    .pipe($.webserver());
});
