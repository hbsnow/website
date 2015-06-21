'use strict';

var gulp = require('gulp');
var exec = require('child_process').exec;
var del = require('del');
var objectAssign = require('object-assign');
var runSequence = require('run-sequence');
var webpack = require('webpack-stream');
var $ = require('gulp-load-plugins')();

var watch = false;



/**
 * Metalsmith
 */

gulp.task('build:metalsmith', function(cb) {
  exec('node metalsmith/build.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('move:metalsmith', function() {
  gulp.src(['metalsmith/build/**/*', '!metalsmith/build/**/*.tpl'])
    .pipe(gulp.dest('tmp/'));
});

gulp.task('move:metalsmith-tpl', function() {
  gulp.src('metalsmith/build/**/*.tpl')
    .pipe($.rename({
      extname: '.tpl.html'
    }))
    .pipe(gulp.dest('tmp/'));
});



/**
 * HTML
 */

gulp.task('public:html', function() {
  gulp.src('tmp/**/*.html')
    .pipe($.inlineSource())
    .pipe(gulp.dest('public/'));
});



/**
 * JavaScript
 */

gulp.task('build:js', function() {
  var src = 'src/scripts/main.js';
  var dist = 'tmp/scripts/';
  var config = {
    output: {
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.jade$/,
          loader: 'jade'
        }
      ]
    },
  };

  if(watch) {
    config = objectAssign(config, {
      watch: true,
      devtool: '#inline-source-map'
    });

    return gulp.src(src)
      .pipe(webpack(config))
      .pipe(gulp.dest(dist));
  } else {
    return gulp.src(src)
      .pipe(webpack(config))
      .pipe($.uglify({
        mangle: false
      }))
      .pipe(gulp.dest(dist));
  }
});

gulp.task('public:js', function() {
  gulp.src('tmp/scripts/**/*.js')
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('watch:js', function(cb) {
  watch = true;

  runSequence('build:js', cb);
});



/**
 * LESS
 */

gulp.task('build:less', function() {
  var src = 'src/styles/*.less';
  var dist = 'tmp/styles/';

  if(watch) {
    return gulp.src(src)
      .pipe($.plumber({
        errorHandler: function (err) {
          console.log(err);
          this.emit('end');
        }
      }))
      .pipe($.sourcemaps.init())
      .pipe($.less())
      .pipe($.autoprefixer())
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(dist));
  } else {
    return gulp.src(src)
      .pipe($.less())
      .pipe($.autoprefixer())
      .pipe($.minifyCss())
      .pipe(gulp.dest(dist))
  }
});

gulp.task('watch:less', function(cb) {
  watch = true;

  runSequence('build:less', function() {
    gulp.watch('src/styles/**/*.less', ['build:less']);
    cb();
  });
});



/**
 * CSS
 */

gulp.task('public:css', function() {
  return gulp.src(['tmp/styles/**/*.css', '!tmp/styles/**.inline.css'])
    .pipe(gulp.dest('public/styles/'));
});



/**
 * Server
 */

gulp.task('serve', function() {
  return gulp.src('tmp')
    .pipe($.webserver());
});



/**
 * Move assets
 */

gulp.task('move:assets', function() {
  var dist = watch ? 'tmp' : 'public';

  gulp.src('src/assets/**/*')
    .pipe(gulp.dest(dist))
});



/**
 * Build
 */

gulp.task('build', function (cb) {
  if(watch) {
    runSequence(
      ['clean:metalsmith', 'clean:tmp'],
      'build:metalsmith',
      ['move:metalsmith', 'move:metalsmith-tpl', 'move:assets'],
      cb
    );
  } else {
    runSequence(
      'clean',
      'build:metalsmith',
      ['build:less', 'build:js', 'move:metalsmith', 'move:metalsmith-tpl'],
      ['public:html', 'public:css', 'public:js', 'move:assets'],
      cb
    );
  }
});



/**
 * Watch
 */

gulp.task('watch', function(cb) {
  watch = true;

  runSequence(['build', 'serve'], ['watch:js', 'watch:less'], cb);
});



/**
 * Clean
 */

gulp.task('clean:metalsmith', function(cb) {
  del('metalsmith/build/**/*', cb);
});

gulp.task('clean:tmp', function(cb) {
  del('tmp/**/*', cb);
});

gulp.task('clean', function(cb) {
  del(['public/**/*', 'tmp/**/*', 'metalsmith/build/**/*'], cb);
});



/**
 * Git
 */

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

gulp.task('git:master', function(cb) {
  exec('git push -u origin master', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('git:gh-pages', function(cb) {
  exec('git subtree push --prefix public origin gh-pages', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('deploy', function(cb) {
  runSequence('git:add', 'git:commit', 'git:master', 'git:gh-pages', cb);
});



/**
 * default
 */

gulp.task('default', function (cb) {
  runSequence('build', 'deploy', cb);
});
