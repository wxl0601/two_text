

var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
gulp.task('server',function(){
    return gulp.src('src')
    .pipe(server({
        port:8888,
        proxies:[
            {source:'/users/api/list',target:"http://192.168.2.70:3000/users/api/list"},
            {source:'/users/api/add',target:"http://192.168.2.70:3000/users/api/add"},
        ]
    }))
})

gulp.task('devScss',function(){
    return gulp.src('./src/scss/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
})

gulp.task('watch',function(){
    return gulp.watch('./src/scss/index.scss',gulp.series('devScss'));
})

gulp.task('dev',gulp.parallel('devScss','watch','server'))