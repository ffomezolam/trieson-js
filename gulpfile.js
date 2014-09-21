var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    mocha = require('gulp-mocha');

gulp.task('default', function() {
    gulp.src('test/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }))

    gulp.src('trieson.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./'))
});
