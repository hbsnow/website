'use strict';

var gulp = require('gulp');
var exec = require('child_process').exec;
var runSequence = require('run-sequence');



gulp.task('git:add', function(cb) {
  exec('git add -A .', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('git:commit', function(cb) {
  exec('git commit -m "write new post"', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('git:push', function(cb) {
  exec('git push -u origin master', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('deploy', function(cb) {
  runSequence('git:add', 'git:commit', 'git:push', cb);
});
