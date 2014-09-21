var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename')

gulp.task('minify', function() {
    gulp.src('trieson.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./'))
});
