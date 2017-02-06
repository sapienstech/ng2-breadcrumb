"use strict"

var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var flatten = require('gulp-flatten');
var tsc = require('gulp-typescript');


var node_path = require('path');

var dest = "dist/out-es5/src/app/breadcrumb";
gulp.task('default', function () {
  //return gutil.log('Gulp is running!')
  console.log("default");
  return 1;
});
gulp.task('tsc', ['default'], function () {
  console.log("tsccccccccccccccc");
});

gulp.task('copyHtml', function () {
  // copy any html files in source/ to public/
  gulp.src('src/*.html')
    .pipe(flatten())
    .pipe(gulp.dest(dest));
});

gulp.task('copyfiles', function () {
  return gulp.src(['src/**/*theme.less',
    'packaging/**/*',
    'README.md',
    'src/*.html'])
    .pipe(flatten())
    .pipe(gulp.dest(dest));
});

gulp.task('less', ['copyfiles'], function () {
  return gulp.src('src/**/*.less')
    .pipe(less())
    .pipe(flatten())
    .pipe(gulp.dest(dest));
});
gulp.task('compileLess', function () {
  return gulp.src('src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest("./src"));
});
gulp.task('copy', ['less'], function () {
  return gulp.src('src/**/*.js')
    .pipe(gulp.dest(dest));
});

var tsProject = tsc.createProject('src/tsconfiges5.json');

gulp.task('tsc', ['less'], function () {
  var tsResult = tsProject.src()
    .pipe(tsProject());

  tsResult.js.pipe(gulp.dest(dest));
});
