let gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-clean-css'),
    jsmin = require('gulp-uglify'),
    webserver = require('gulp-webserver'),
    livereload = require('gulp-livereload');

let path = {
    html: [
        './*.html'
    ],
    styles: {
        src: [
            './node_modules/bootstrap/dist/css/bootstrap.css',
            './node_modules/font-awesome/css/font-awesome.min.css',
            './node_modules/highcharts/css/highcharts.css',
            './node_modules/simple-pagination.js/simplePagination.css',
            './assets/styles/index.less'
        ],
        dependencies: [
            './assets/styles/'
        ],
        name: 'style',
        dest: './build/'
    },
    scripts: {
        src: [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
            './node_modules/highcharts/js/highcharts.js',
            './node_modules/highcharts/modules/exporting.js',
            './node_modules/highcharts/modules/data.js',
            './node_modules/highcharts/js/highcharts.js',
            './node_modules/jquery-ui-dist/jquery-ui.js',
            './node_modules/moment/moment.js',
            './node_modules/simple-pagination.js/jquery.simplePagination.js',
            './assets/js/*.js'
        ],
        name: 'scripts',
        dest: './build/'
    }
};
let watchersPath = {
    html: [
        './*.html'
    ],
    styles: [
        './assets/styles/*.less'
    ],
    scripts: [
        './assets/js/*.js'
    ]
};

gulp.task('html', function () {
    return gulp.src(path.html)
        .pipe(livereload());// notify livereload server about changes
});

gulp.task('style', function () {
    return gulp.src(path.styles.src)
        .pipe(concat('style.less'))
        .pipe(less({
            paths: path.styles.dependencies
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename(path.styles.name + '.css'))
        .pipe(gulp.dest(path.styles.dest))
        .pipe(cssmin())
        .pipe(rename(path.styles.name + '.min.css'))
        .pipe(gulp.dest(path.styles.dest))
        .pipe(livereload());
});

gulp.task('scripts', function () {
    return gulp.src(path.scripts.src)
        .pipe(concat('scripts.js'))
        .pipe(rename(path.scripts.name + '.js'))
        .pipe(gulp.dest(path.scripts.dest))
        /*.pipe(jsmin())*/
        .pipe(rename(path.scripts.name + '.min.js'))
        .pipe(gulp.dest(path.scripts.dest))
        .pipe(livereload());
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            open: true,
            fallback: 'index.html'
        }));
});

gulp.task('watch', ['style', 'scripts', 'webserver'], function() {
    livereload.listen();
    gulp.watch(watchersPath.html, ['html']);
    gulp.watch(watchersPath.styles, ['style']);
    gulp.watch(watchersPath.scripts, ['scripts']);
});

gulp.task('build', ['style', 'scripts']);

gulp.task('default', ['build']);


