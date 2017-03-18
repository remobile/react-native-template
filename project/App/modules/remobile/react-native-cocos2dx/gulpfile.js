var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var through = require('through2');

var path = './';
var file = 'remobile_cocos2dx_render.js';

gulp.task('release', function() {
    return gulp.src([
        path+'src/**/*.js',
    ])
    .pipe(concat(file))
    .pipe(uglify({compress: {drop_console: true}}))
    .pipe(through.obj((file, encoding, callback)=>{file.contents = new Buffer('module.exports=(res, params)=>{'+String(file.contents)+ '}'); callback(null, file);}))
    .pipe(gulp.dest(path));
});

gulp.task('dev', ['release'], function() {
    gulp.watch([path+'src/**/*.js'], ['release']);
});
