'use strict';

var gulp = require('gulp');
var del = require('del');

var paths = require('./config/gulp-paths.json');



gulp.task('clean:dist', function(cb) {
  del(paths.dist, cb);
});

gulp.task('clean:build', function(cb) {
  del(paths.build, cb);
});

gulp.task('clean', ['clean:dist', 'clean:build']);
