var gulp = require("gulp");
var ugligy = require("gulp-uglify");
var livereload = require("gulp-livereload");
var concat = require("gulp-concat");

// FOLDER'S PATHS
const   SCRIPTS_PATH = "public/js/**/*.js",
        CSS_PATH = "public/styles/**/*.css",
        DIST_PATH = "dist";

// STYLE PROCESS
gulp.task("styles", function() {
    return gulp.src(CSS_PATH)
                .pipe(concat("app.css"))
                .pipe(gulp.dest(DIST_PATH+"/styles"))
                .pipe(livereload());
});

// SCRIPTS PROCESS
gulp.task("scripts", function(){ 
    return gulp.src(SCRIPTS_PATH)
            .pipe(ugligy())
            .pipe(gulp.dest(DIST_PATH+"/js"))
            .pipe(livereload());
});

// WATCH PROCESS
gulp.task("watch",function() {
    console.log("Starting watch...");
    require("./server.js");
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ["scripts"]);
    gulp.watch(CSS_PATH, ["styles"]);
});

// DEFAULT TASK
gulp.task("default", function() {
    console.log("Starting the default task");
});