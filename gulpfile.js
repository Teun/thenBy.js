const {dest, src, series, parallel} = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const insert = require('gulp-insert');
const replace = require('gulp-replace');
const umd = require('gulp-umd');
const mocha = require('gulp-mocha');

function minify() {
    return src('thenBy.js')
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
        .pipe(insert.prepend('/*** Copyright 2020 Teun Duynstee Licensed under the Apache License, Version 2.0 ***/\n'))
        .pipe(dest('.'));
}
function module() {
    return src('thenBy.js')
        .pipe(replace(/var firstBy = \(/, 'module.exports = ('))
        .pipe(rename({suffix:'.module'}))
        .pipe(dest('.'));
}
const build = parallel(minify, module);

const mochanode = series(
    build, 
    () => {
        return src('tests/thenby.tests.js', {read: false})
            .pipe(mocha({reporter: 'tap', ui :'tdd'}));
    });
exports.minify = minify;
exports.module = module;
exports.build = build;
exports.mochanode = mochanode;
exports.test = mochanode;
exports.default = exports.test;
