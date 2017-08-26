var gulp = require("gulp");
var ugligy = require("gulp-uglify");

// FOLDER'S VARIABLES
const dirs = {
    "scripts"       : "js",
    "images"        : "img",
    "distribution"  : "build" 
};

// STYLE PROCESS
gulp.task("styles", function() {

});

// SCRIPTS PROCESS
gulp.task("scripts", function(){ 
    return gulp.src("public/"+ dirs.scripts + "/**/*")
            .pipe(ugligy())
            .pipe(gulp.dest(dirs.distribution+"/"+dirs.scripts));
})

// DEFAULT TASK
gulp.task("default", function() {
    console.log("Starting the default task");
});