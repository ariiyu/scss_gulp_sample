var gulp = require("gulp");
var browserSync = require('browser-sync');
var sass = require("gulp-sass");
var pleeease = require('gulp-pleeease');

gulp.task("sass", function() {
	gulp.src("./scss/*.scss")
	.pipe(sass().on("error", sass.logError))
	.pipe(pleeease({
      "out": "style.css",
      "sass": true,
      "browsers": ["last 3 versions", "Android 2.3", "Firefox >= 20"],
      "minifier": false
    }))
	.pipe(gulp.dest("./"))
	.pipe(browserSync.stream());
});

gulp.task("serve", ["sass"], function() {
	browserSync({
		proxy : "localhost:8888",
        files : ["*.css", "*.php", "*.scss", "*.js"],
        notify: false
	});
	gulp.watch("./scss/**/*.scss", ["sass"]);
    gulp.watch("./js/**/*.js").on("change", browserSync.reload);
    gulp.watch("*.php").on("change", browserSync.reload);
});

gulp.task("default", ["serve"]);
