/// <binding BeforeBuild='clean, default' />
"use strict";

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    htmlmin = require("gulp-htmlmin"),
    uglify = require("gulp-uglify"),
    merge = require("merge-stream"),
    del = require("del"),
	bundleconfig = require("./bundleconfig.json");

var sass = require('gulp-sass');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var webroot = "./wwwroot/";
var paths = {
	scss: webroot + "sass/**/*.scss",
	scssDest: webroot + "css/"
};

// 1. react
gulp.task('react', function () {
	return browserify({ entries: './wwwroot/clientapp/root', extensions: ['.jsx', '.js'], debug: true })
		.transform('babelify', { presets: ['es2015', 'react'] })
		.bundle()
		.pipe(source('index.js'))
		.pipe(gulp.dest('./wwwroot/'));
});

// 2. sass
gulp.task('compile:sass', function () {
	gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(paths.scssDest));
});

gulp.task("compile", ["compile:sass"]);

// minify sass output
function getBundles(regexPattern) {
	return bundleconfig.filter(function (bundle) {
		return regexPattern.test(bundle.outputFileName);
	});
}
gulp.task("mincss", function () {
	var tasks = getBundles(/\.css$/).map(function (bundle) {
		return gulp.src(bundle.inputFiles, { base: "." })
			.pipe(concat(bundle.outputFileName))
			.pipe(cssmin())
			.pipe(gulp.dest("."));
	});
	return merge(tasks);
});

gulp.task("clean", function () {
	return del(['wwwroot/css/*', 'wwwroot/index.js']);
});

//gulp.task("watch", function () {
//	gulp.watch('./wwwroot/clientapp/**/*{.js,.jsx}', ['build']);
//	gulp.watch(paths.scss, ['compile:sass']);
//});

gulp.task("default", ["clean", "react", "compile", "mincss"]);