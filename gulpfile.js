"use strict"

var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var tsc = require('gulp-typescript');

var node_path = require('path');

var dest="dist/out-es5";
gulp.task('default', function() {
  //return gutil.log('Gulp is running!')
  console.log("default");
  return 1;
});
gulp.task('tsc',['default'], function(){
  console.log("tsccccccccccccccc");
});

gulp.task('copyHtml', function() {
  // copy any html files in source/ to public/
  gulp.src('src/*.html').pipe(gulp.dest(dest));
});

gulp.task('theme',['copyHtml'],function(){
  return gulp.src('src/**/*theme.less')
        .pipe(gulp.dest(dest));
});

gulp.task('less',['theme'],function(){
  return gulp.src('src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest(dest));
});
gulp.task('copy',['less'],function(){
  return gulp.src('src/**/*.js')
    .pipe(gulp.dest(dest));
});

var tsProject = tsc.createProject('src/tsconfigbuild.json');

gulp.task('tsc',['less'],function(){
  var tsResult = tsProject.src()
    .pipe(tsProject());

  tsResult.js.pipe(gulp.dest(dest));
});
