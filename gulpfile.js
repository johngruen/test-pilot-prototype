var autoprefixer = require('gulp-autoprefixer');
var data = require('gulp-data');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var livereload = require('gulp-livereload');
var normalize = require('node-normalize-scss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');

gulp.task('styles', function () {
  return gulp.src('./src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: normalize.includePaths }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write({ sourceRoot: 'src/styles' }))
    .pipe(gulp.dest('./app/styles'))
    .pipe(livereload());
});

gulp.task('templates', function () {
  return gulp.src('./src/templates/**/*.jade')
  .pipe(data(function () {
    return require('./data.json');
  }))
  .pipe(jade({
    pretty: true
  }).on('error', gutil.log))
  .pipe(gulp.dest('./app'))
  .pipe(livereload());
});

gulp.task('move:jquery', function () {
  gulp.src('./node_modules/jquery/dist/jquery.min.js')
  .pipe(gulp.dest('./app/lib/jquery'));
});

gulp.task('move:images', function () {
  gulp.src('./src/images/**')
  .pipe(gulp.dest('./app/images'));
});

gulp.task('move:script', function () {
  return gulp.src('./src/scripts/main.js')
    .pipe(gulp.dest('./app/scripts/'))
    .pipe(livereload());
});

gulp.task('build', ['move:jquery', 'move:script', 'move:images', 'templates', 'styles']);

gulp.task('server', function () {
  gulp.src('app')
    .pipe(webserver({
      directoryListing: false
    }));
});

gulp.task('default', ['build', 'server'], function () {
  livereload.listen();
  gulp.watch('./data.json', ['templates']);
  gulp.watch('./src/styles/**/*.scss', ['styles']);
  gulp.watch('./src/**/*.jade', ['templates']);
  gulp.watch('./src/**/*.js', ['move:script']);
  gulp.watch('./dist/**').on('change', livereload.changed);
});
