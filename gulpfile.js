let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let minify = require('gulp-minify');
let rename = require('gulp-rename');


gulp.task('minify-js', () => {
    return gulp.src(['src/*.js'])
        .pipe(minify())
        .pipe(gulp.dest('lib'));
});

gulp.task('minify-css', () => {
    return gulp.src('style/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({
            suffix: '-min'
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('minify', gulp.parallel('minify-js', 'minify-css'));
