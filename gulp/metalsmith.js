'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var exec = require('child_process').exec;

var paths = require('./config/gulp-paths.json');

gulp.task('build:metalsmith', function(cb) {
  exec('node ' + paths.metalsmith.src + 'build.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('dist:metalsmith', function() {
  return gulp.src(paths.metalsmith.src + 'dist/**/*')
    .pipe(gulp.dest(paths.dist));
});

gulp.task('metalsmith', function(cb) {
  runSequence('build:metalsmith', 'dist:metalsmith', cb);
});
