var gulp = require("gulp");
var ugligy = require("gulp-uglify");

// FOLDER'S PATHS
const   SCRIPTS_PATH = "public/js/**/*.js",
        DIST_PATH = "dist";

// STYLE PROCESS
gulp.task("styles", function() {

});

// SCRIPTS PROCESS
gulp.task("scripts", function(){ 
    return gulp.src(SCRIPTS_PATH)
            .pipe(ugligy())
            .pipe(gulp.dest(DIST_PATH+"/js"));
});

// WATCH PROCESS
gulp.task("watch",function() {
    console.log("Starting watch...");
    var server = require("./server.js");
    gulp.watch(SCRIPTS_PATH, ["scripts"])
});

// DEFAULT TASK
gulp.task("default", function() {
    console.log("Starting the default task");
});