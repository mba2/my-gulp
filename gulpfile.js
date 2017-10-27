// MODULES
// =========================
const gulp          = require('gulp');                  // MAIN MODULE
const $             = require('gulp-load-plugins')();   // THIS VARIABLE WILL HOLD ALMOST !!! ALL PLUGINS

const livereload = require('gulp-livereload');


// MODULES THAT FAILS TO BE LOADED INTO $ VARIABLE
// =============== 
const del           = require('del');                    // MODULE TO DELETE FILES AND FOLDERS
const autoprefixer  = require('autoprefixer');           // MODULE TO INSERT BROWSER'S VENDOR ON CSS RULES
const cssnano       = require('cssnano');                // MODULE TO MINIFY CSS
const cssnext       = require('postcss-cssnext');                // MODULE TO USE RECENT CSS SYNTAXES THAT ARENT'T FULLY IMPLEMENTED
const runSequence   = require('run-sequence');           // MODULE TO CREATE A SEQUENCE OF RUNNED TASKS

// BUILD CONFIGURATION OPTIONS
// =============== 
const PATHS = {
    src         : '/src',
    dev         : 'build',
    deploy      : 'deploy',
    styles : {
        src     : 'src/public/styles/**/*.{scss,css}',
        build   : 'build/public/styles/',
        deploy  : 'deploy/public/styles/',
    },    
    // scripts : {
    //     src : ,
    //     build : ,
    //     deploy : ,
    // }    
}
const PROD_ENV      =  !!$.util.env.production;

// CLEAR PROCESS
gulp.task('clean',() => {
    return del(
        (PROD_ENV) ? PATHS.deploy : PATHS.dev 
    );
});

// STYLES PROCESS
gulp.task('styles', () => {
    // A CONSTANT TO FILTER CSS FILES
    const cssFiles = $.filter(['**/*.css'],{'restore' : true }); 
    
    // A CONSTANT TO FILTER  SASS FILES 
    const sassFiles = $.filter(['**/*.scss'],{'restore' : true }); 
    
    return gulp.src(PATHS.styles.src)
                .pipe( $.plumber() )                                          // HANDLING ERRORS
                .pipe( (PROD_ENV) ? $.sourcemaps.init() : $.util.noop() )     // IN 'PRODUCTION' INITIALIZE SOURCE MAPS               
                .pipe( $.postcss([cssnext()]) )                               // CSSNEXT(): INSERTS VENDOR PREFIXES IN CSS AND SASS FILES && AUTOPREFIXES BROWSERS VENDORS
                // .pipe( sassFiles )                                            // THIS IS A FILTER...THAT LET`S THE PIPE CONTAINING AT THIS MOMENET, ONLY SASS FILES
                .pipe( $.sass() )                                             // COMPILING THOSES SASS FILES
                // .pipe( sassFiles.restore )                                    // INSERT THE CSS FILES BACK INTO THE PIPE                
                .pipe( (PROD_ENV) ? $.postcss([cssnano()]) : $.util.noop() )  // IN 'PRODUCTION' MODE MINIFY THE STYLES                
                .pipe( (PROD_ENV) ? $.concat('syles.css') : $.util.noop() )   // IN 'PRODUCTION' CONCATENATES ALL STYLES INTO ONE!               
                .pipe( (PROD_ENV) ? $.sourcemaps.write()  : $.util.noop() )   // IN 'PRODUCTION' WRITE ALL SOURCE MAPS               
                .pipe( gulp.dest( (PROD_ENV) ? PATHS.deploy + '/styles'  : PATHS.dev ) );
});


gulp.task('watch', () =>  {
    gulp.watch(PATHS.styles.src, ['styles']);
});
    

// DEFAULT TASK
gulp.task("default",
                    () => {
                        // console.log($);
                        runSequence(
                            'clean',
                            'styles'
                        );
                        if( !PROD_ENV) runSequence('watch');
                    }
);