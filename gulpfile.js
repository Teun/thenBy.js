var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var replace = require('gulp-replace');

gulp.task('minify', function() {
    return gulp.src('thenBy.js')
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(insert.prepend('/*** Copyright 2013 Teun Duynstee Licensed under the Apache License, Version 2.0 ***/\n'))
        .pipe(gulp.dest('.'));
});

gulp.task('module', function() {
    return gulp.src('thenBy.js')
        .pipe(replace(/firstBy = \(/, 'module.exports = ('))
        .pipe(rename({suffix:'.module'}))
        .pipe(gulp.dest('.'));
});
gulp.task('default', ['minify', 'module']);