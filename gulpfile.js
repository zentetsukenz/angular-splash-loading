'use strict';

var path = require('path'),
  gulp = require('gulp'),
  del = require('del'),
  vinylPaths = require('vinyl-paths'),
  extend = require('extend'),
  Server = require('karma').Server,
  karmaConfig = require('./test/karma.conf'),
  config = require('./build.conf.js'),
  plugins = require('gulp-load-plugins')({
    rename: {
      'gulp-minify-css': 'cssmin'
    }
  });

var ciMode = false;

gulp.task('clean', function () {
  return gulp
    .src(config.buildFolder, {read: false})
    .pipe(vinylPaths(del));
});

gulp.task('scripts', function () {

  return gulp.src(config.srcJs)

    // jshint
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.if(ciMode, plugins.jshint.reporter('fail')))

    // package
    .pipe(plugins.concat(config.buildJsFilename))
    .pipe(plugins.header(config.closureStart))
    .pipe(plugins.footer(config.closureEnd))
    .pipe(plugins.header(config.banner))
    .pipe(gulp.dest(config.buildFolder))
    .pipe(plugins.filesize())

    // minify
    .pipe(plugins.uglify())
    .pipe(plugins.rename({ extname: '.min.js' }))
    .pipe(gulp.dest(config.buildFolder))
    .pipe(plugins.filesize())
    .on('error', plugins.util.log);

});

gulp.task('css', function () {
  return gulp.src(config.srcCss)

    // autoprefix
    .pipe(plugins.autoprefixer())

    // csslint
    .pipe(plugins.csslint('.csslintrc'))
    .pipe(plugins.csslint.reporter())

    // package
    .pipe(plugins.concat(config.buildCssFilename))
    .pipe(plugins.header(config.banner))
    .pipe(gulp.dest(config.buildFolder))
    .pipe(plugins.filesize())

    // minify
    .pipe(plugins.cssmin())
    .pipe(plugins.rename({ extname: '.min.css' }))
    .pipe(gulp.dest(config.buildFolder))
    .pipe(plugins.filesize())

    .on('error', plugins.util.log);
});

gulp.task('test', function () {
  karmaConfig({
    set: function (testConfig) {
      extend(testConfig, {
        singleRun: ciMode,
        autoWatch: !ciMode
      });

      new Server(testConfig, function (exitCode) {
        plugins.util.log('Karma has exited with ' + exitCode);
        process.exit(exitCode);
      }).start();
    }
  });
});

gulp.task('watch', function () {
  return gulp.watch(config.srcJs, ['scripts']);
});

gulp.task('ci', function () {
  ciMode = true;
  return gulp.start(['clean', 'css', 'scripts', 'test']);
});

gulp.task('tdd', function () {
  ciMode = false;
  return gulp.start(['test']);
});

gulp.task('default', ['scripts']);
