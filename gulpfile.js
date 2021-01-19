var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var ignore = require('gulp-ignore');
var gutil = require('gulp-util');
var minifyJS = require('gulp-minify');
var header = require("gulp-header");
var pkg = require("./package.json");
var fs = require('fs')

var banner = ["/**",
    " * <%= pkg.name %> v<%= pkg.version %>",
	" * @link <%= pkg.homepage %>",
	" * @repo <%= pkg.repository.url %>",
	" *",
	" * <%= pkg.description %>",
	" * Written by <%= pkg.author.name %> <<%= pkg.author.email %>>",
	" * License <%= pkg.license %>",
	" */",
  ""].join("\n");
  
var importCSS = `var head  = document.getElementsByTagName('head')[0]
var link  = document.createElement('link')
link.rel  = 'stylesheet'
link.type = 'text/css'
link.href = 'https://cdn.jsdelivr.net/gh/mymk95/q8-prayers@${pkg.version}/dist/all.min.css'
head.appendChild(link)
`;

var scripts = [
  './js/import-css.js',
  './js/toArabicNumbers.js',
  './js/reformatData.js',
  './js/fetchPrayers.js',
  './js/app.js',
]

var scripts_dev = [
  './js/import-css-dev.js',
  './js/toArabicNumbers.js',
  './js/reformatData.js',
  './js/fetchPrayers.js',
  './js/app.js',
]

gulp.task('sass', async function(){
  gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss())
    .pipe(rename("all.min.css"))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass-dev', async function(){
  gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename("dev.css"))
    .pipe(gulp.dest('./scss'));
});

gulp.task('scripts', async function(){
  fs.writeFileSync('js/import-css.js', importCSS);
  gulp.src(scripts)
  .pipe(concat('all.js'))
  .pipe(ignore.exclude(['**/*.map']))
  .pipe(minifyJS({
    ext:{
      min:'.min.js'
    },
    noSource: true
  }))
  .on('error', function(err){ gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(header(banner, {pkg: pkg}))
  .pipe(gulp.dest('./dist'))
});

gulp.task('scripts-dev', async function(){
  gulp.src(scripts_dev)
  .pipe(concat('dev.js'))
  .pipe(ignore.exclude(['**/*.map']))
  .on('error', function(err){ gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(gulp.dest('./js'))
});

gulp.task('run-dev', gulp.series('sass-dev', 'scripts-dev'));

gulp.task('watch', function(){
  gulp.watch('./scss/*.scss', gulp.series('sass-dev'));
  gulp.watch(scripts_dev, gulp.series('scripts-dev'));
})

gulp.task('build', gulp.series('sass', 'scripts'));
gulp.task('default', gulp.series('run-dev', 'watch'));
