// MODULES
// =========================
const gulp          = require('gulp');                  // MAIN MODULE
const $             = require('gulp-load-plugins')();   // THIS VARIABLE WILL HOLD ALMOST !!! ALL PLUGINS

// MODULES THAT FAILS TO BE LOADED INTO $ VARIABLE
// =============== 
const del           = require('del');                    // MODULE TO DELETE FILES AND FOLDERS
const autoprefixer  = require('autoprefixer');           // MODULE TO INSERT BROWSER'S VENDOR ON CSS RULES
const cssnano       = require('cssnano');                // MODULE TO MINIFY CSS
const cssnext       = require('postcss-cssnext');                // MODULE TO USE RECENT CSS SYNTAXES THAT ARENT'T FULLY IMPLEMENTED
const runSequence   = require('run-sequence');           // MODULE TO CREATE A SEQUENCE OF RUNNED TASKS

// BUILD CONFIGURATION OPTIONS
// =============== 
const SRC_PATH      =  'public';
const DEV_PATH      =  'build';
const DEPLOY_PATH   =  'deploy';
const PROD_ENV      =  !!$.util.env.production;

// CLEAR PROCESS
gulp.task('clean',() => {
    return del(
        (PROD_ENV) ? DEPLOY_PATH : DEV_PATH 
    );
});

// STYLES PROCESS
gulp.task('styles', () => {
    // A CONSTANT TO FILTER CSS FILES
    const cssFiles = $.filter(['**/*.css'],{'restore' : true }); 
    
    // A CONSTANT TO FILTER  SASS FILES 
    const sassFiles = $.filter(['**/*.scss'],{'restore' : true }); 
    
    return gulp.src(SRC_PATH + '/**/*.{scss,css}')
                .pipe( $.plumber() )                                          // HANDLING ERRORS
                .pipe( (PROD_ENV) ? $.sourcemaps.init() : $.util.noop() )     // IN 'PRODUCTION' INITIALIZE SOURCE MAPS               
                .pipe( $.postcss([cssnext()]) )                               // CSSNEXT(): INSERTS VENDOR PREFIXES IN CSS AND SASS FILES && AUTOPREFIXES BROWSERS VENDORS
                // .pipe( sassFiles )                                            // THIS IS A FILTER...THAT LET`S THE PIPE CONTAINING AT THIS MOMENET, ONLY SASS FILES
                .pipe( $.sass() )                                             // COMPILING THOSES SASS FILES
                // .pipe( sassFiles.restore )                                    // INSERT THE CSS FILES BACK INTO THE PIPE                
                .pipe( (PROD_ENV) ? $.postcss([cssnano()]) : $.util.noop() )  // IN 'PRODUCTION' MODE MINIFY THE STYLES                
                .pipe( (PROD_ENV) ? $.concat('syles.css') : $.util.noop() )   // IN 'PRODUCTION' CONCATENATES ALL STYLES INTO ONE!               
                .pipe( (PROD_ENV) ? $.sourcemaps.write()  : $.util.noop() )   // IN 'PRODUCTION' WRITE ALL SOURCE MAPS               
                .pipe( gulp.dest( (PROD_ENV) ? DEPLOY_PATH + '/styles'  : DEV_PATH ) );
});



// DEFAULT TASK
gulp.task("default",
                    () => {
                        // console.log($);
                        runSequence(
                            'clean',
                            'styles'
                        )
                    }
);