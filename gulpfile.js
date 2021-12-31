var gulp = require('gulp')
var sass = require('gulp-sass')
var uglifycss = require('gulp-uglifycss')
var rename = require("gulp-rename")
var concat = require('gulp-concat')
var ignore = require('gulp-ignore')
var gutil = require('gulp-util')
var minifyJS = require('gulp-minify')
var header = require("gulp-header")
var pkg = require("./package.json")

var banner = ["/**",
    " * <%= pkg.name %> v<%= pkg.version %>",
	" * @link <%= pkg.homepage %>",
	" * @repo <%= pkg.repository.url %>",
	" *",
	" * <%= pkg.description %>",
	" * Author <%= pkg.author.name %> <<%= pkg.author.email %>>",
	" * License <%= pkg.license %>",
	" */",
  ""].join("\n")

// development tasks
gulp.task('scripts-dev', async function(){
  gulp.src('./js/**/*.js')
  .pipe(concat('dev.js'))
  .pipe(ignore.exclude(['**/*.map']))
  .on('error', function(err){ gutil.log(gutil.colors.red('[Error]'), err.toString()) })
  .pipe(gulp.dest('./dev'))
})

gulp.task('sass-dev', async function(){
  gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename("dev.css"))
    .pipe(gulp.dest('./dev'))
})

// production tasks
gulp.task('scripts', async function(){
  gulp.src('./js/**/*.js')
  .pipe(concat('all.js'))
  .pipe(ignore.exclude(['**/*.map']))
  .pipe(minifyJS({
    ext:{
      min:'.min.js'
    },
    noSource: true
  }))
  .on('error', function(err){ gutil.log(gutil.colors.red('[Error]'), err.toString()) })
  .pipe(header(banner, {pkg: pkg}))
  .pipe(gulp.dest('./dist'))
})

gulp.task('sass', async function(){
  gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss())
    .pipe(rename("all.min.css"))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist'))
})

// tasks
gulp.task('run-dev', gulp.series('sass-dev', 'scripts-dev'))

gulp.task('watch', function(){
  gulp.watch('./scss/**/*.scss', gulp.series('sass-dev'))
  gulp.watch('./js/**/*.js', gulp.series('scripts-dev'))
})

gulp.task('build', gulp.series('sass', 'scripts'))
gulp.task('default', gulp.series('run-dev', 'watch'))
