var gulp = require('gulp'),
    bower = require('gulp-bower'),
    wiredep = require('wiredep').stream,
    browserSync = require('browser-sync').create(),
    rename      = require('gulp-rename'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssnano'),
    concatCss = require('gulp-concat-css'),
    autoprefixer = require('gulp-autoprefixer');

    gulp.task('browser-sync', ['sass'], function () {
        browserSync.init({
            server: "./app",
            notify: false,
            port: 8080,
            ui: {
                port: 8081
            }
        });
    });

gulp.task('bower', function () {
    return bower();
});

gulp.task('bower-inject', ['bower'], function () {
    gulp.src('./app/index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('./app'));
});

var sassOptions = {
    outputStyle: 'expanded'
};

gulp.task('sass', function () {
    return gulp.src(["app/libs/animate.css/animate.css", "app/libs/nanoscroller/bin/css/nanoscroller.css" , "app/scss/*.scss"])
        .pipe(sass().on('error', sass.logError))
        .pipe(sass(sassOptions))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['bower', 'browser-sync'], function () {
    gulp.watch("app/scss/*.scss", ['sass']);
   /* gulp.watch("app/css/!*.css", ['css']);*/
    gulp.watch("bower.json", ['bower-inject']);
    gulp.watch("app/js/*.js").on('change', browserSync.reload);
    gulp.watch("./app/index.html").on('change', browserSync.reload);
    gulp.watch("./app/landingpage/daikin.html").on('change', browserSync.reload);
});

gulp.task('default', ['watch']);