var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var replace = require('gulp-replace');
var umd = require('gulp-umd');
var mochaPhantomjs = require('gulp-mocha-phantomjs');
var mocha = require('gulp-mocha');

gulp.task('minify', function() {
    return gulp.src('thenBy.js')
        .pipe(umd({
            exports: function (file) {
                return 'firstBy';
            },
            namespace: function(file) {
                return 'firstBy';
            }
        }))
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(insert.prepend('/*** Copyright 2013 Teun Duynstee Licensed under the Apache License, Version 2.0 ***/\n'))
        .pipe(gulp.dest('.'));
});

gulp.task('module', function() {
    return gulp.src('thenBy.js')
        .pipe(replace(/var firstBy = \(/, 'module.exports = ('))
        .pipe(rename({suffix:'.module'}))
        .pipe(gulp.dest('.'));
});

gulp.task('build', ['minify', 'module']);

gulp.task('mochaphantom', ['build'], () => {
    return gulp.src('tests/index.html')
        .pipe(mochaPhantomjs({reporter: 'tap'}));
});

gulp.task('mochanode', ['build'], () => {
    return gulp.src('tests/thenby.tests.js', {read: false})
        .pipe(mocha({reporter: 'tap', ui :'tdd'}))
});

gulp.task('test', [/*'mochaphantom',*/ 'mochanode']);

gulp.task('default', ['test']);
