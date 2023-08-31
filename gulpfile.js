const { src, dest, watch, series, parallel } = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sourcemap = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

function defaultTask(cb) {
    // place code for your default task here
    cb();
}

function HTMLTask() {
    return src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        })
        )
        .pipe(dest('dist/'));
}

function styleTask() {
    return src('src/sass/**/*.scss')
        .pipe(sourcemap.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemap.write('.'))
        .pipe(dest('dist/css/'));
}

function jsTask() {
    return src([
        'src/js/*.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/moment/moment.js'
    ])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/js/'));

}

function watchTask() {
    watch('src/**/*.html', HTMLTask);
    watch('src/**/*.scss', series(styleTask, browserSyncReload));
    watch('src/**/*.js', jsTask);
    // watch('src/**/*.html', browserSyncReload);
    // watch('src/**/*.scss', browserSyncReload);
    // watch('src/**/*.js', browserSyncReload);
}

function browserSyncServer() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
}

function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

exports.browserSyncServer = browserSyncServer;
exports.watchTask = watchTask;
exports.jsTask = jsTask;
exports.styleTask = styleTask;
exports.HTMLTask = HTMLTask;
exports.default = series(
    HTMLTask,
    styleTask,
    jsTask,
    parallel(browserSyncServer, watchTask)
);