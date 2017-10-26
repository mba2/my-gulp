// MODULES
// =========================
const gulp          = require('gulp');                  // MAIN MODULE
const $             = require('gulp-load-plugins')();   // THIS VARIABLE WILL HOLD ALMOST !!! ALL PLUGINS

// MODULES THAT FAILS TO BE LOADED INTO $ VARIABLE
// =============== 
const del = require('del');                             // MODULE TO DELETE FILES AND FOLDERS

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
    
});



// DEFAULT TASK
gulp.task("default",[
                        'clean',
                        'styles'
                    ],

                    () => {
                    
                    }
);