var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function() {
    gulp.src('./carepulse_generics/static/carepulse_generics/scss/external_pages/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['node_modules/foundation-sites/scss','node_modules/foundation-sites/scss/util','carepulse_generics/static/carepulse_generics/scss/external_pages','node_modules/@fortawesome/fontawesome-free/scss'],
            outputStyle: 'compressed'
        }))
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9', 'android >= 4.4', 'ios >= 7'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./carepulse_generics/static/carepulse_generics/compiled_css/'));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('./carepulse_generics/static/carepulse_generics/scss/external_pages/**/*.scss',['styles']);
});