// Chamando todas as Tasks
let gulp        = require('gulp');
let jshint 		= require('gulp-jshint');
let cleanCSS    = require('gulp-clean-css');
let runSequence = require('run-sequence');
let clean 		= require('gulp-clean');
let concat      = require('gulp-concat');
let jsmin 		= require('gulp-jsmin');
let autoprefixer= require('gulp-autoprefixer');
let connect 	= require('gulp-connect');
let imagemin 	= require('gulp-imagemin');

// =========== | INICIANDO AS TASK's | ============== // 

// task clean
gulp.task('clean', function(){
	gulp.src('dist/')
	.pipe(clean());
}); 

// JS Hint
gulp.task('jshint', function(){
	return gulp.src('js/*.js')
	.pipe(jshint({esversion: 6}))
    .pipe(jshint.reporter('default'));
}); 

// Css minifier
gulp.task('mincss', function(){
    return gulp.src('assets/**/*.css')    
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer({
    	browsers: ['last 2 versions'],
    	cascade: true
    }))
    .pipe(concat('all-css.min.css'))
    .pipe(gulp.dest('dist/css'));
}); 

// Prefixer Css && Sass
gulp.task('prefixer', function() {
  return gulp.src('assets/**/*.css')
});

// Minificando o js com MinJs
gulp.task('uglify', function () {
	return gulp.src('assets/**/*.js')
    .pipe(jsmin())
    .pipe(concat('all-scripts.min.js'))
    .pipe(gulp.dest('dist/js'));
});

// Minificando as imagens
gulp.task('imagemin', function(){
    return gulp.src('assets/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images-minify'));
});

// Servidor Front apenas para teste
gulp.task('connect', function () {
  connect.server({
    name: 'App',
    root: './',
    port: 7070,
    livereload: true
  });

});

// Gerando por sequencia (Primeiro rodar um gulp clean depois só gulp)
gulp.task('default', (cb) => {
	 runSequence(['imagemin','jshint', 'mincss', 'uglify', 'prefixer'], cb);
});