const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS    = require('gulp-clean-css');
const rename      = require("gulp-rename")
const htmlmin    = require('gulp-htmlmin');


gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(cleanCSS({compatibility: 'ie8', level: {1: {specialComments: 0}}}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
})

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
})

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"));
})

gulp.task('mailer', function () {
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"));
})

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(gulp.dest("dist/img"));
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'icons', 'mailer', 'images', 'html'));
