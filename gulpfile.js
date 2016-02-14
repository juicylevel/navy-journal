'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

var paths = {
    scripts: ['js/**/*', '!js/scripts.js'],
};

// очистка папки build
gulp.task('clean', function() {
	return del(['build']);
});

gulp.task('build-journal', ['clean'], function() {
	// минификация файлов, объединене их в app.min.js
	return gulp.src(paths.scripts)
		.pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('build'));
});
