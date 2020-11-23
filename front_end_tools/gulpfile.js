var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var minify = require('gulp-minify');

sass.compiler = require('node-sass');

gulp.task('scss', (cb) => {
  gulp.src('./src/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .on('error', sass.logError)
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist'));
  cb();
});

gulp.task('js', (cb) => {
  gulp.src('./src/js/**/*.js')
  .pipe(plumber())
  .pipe(babel({
    presets: [
      ['@babel/env', {
        modules: false
      }]
    ]
  }))
  .pipe(minify({
    ext:{
        min:'.js'
    },
    noSource: true
  }))
  .pipe(gulp.dest('./dist'));
  cb();
});

gulp.task('watch:scss', (cb) => {
  gulp.watch('./src/scss/**/*.scss', gulp.series('scss'));
  cb();
});

gulp.task('default', gulp.series('scss', 'js'));