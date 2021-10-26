
const 
  gulp = require('gulp'),
  liveAlertBP = require("live-alert-bp"),
  plumber = require('gulp-plumber'),
  gulpSass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano');

const 
  cssWatch = 'src/scss/*.scss',
  cssSrc = ['src/scss/*.scss'],
  cssDest = 'build/css';

const 
  liveAlert = new liveAlertBP({host: '127.0.0.1', port: '8080'});


gulp.task('css', function () {
  return gulp.src(cssSrc)
  .pipe(plumber({errorHandler: onError}))        
  .pipe(gulpSass().on('error', gulpSass.logError))   
  .pipe(postcss([
      cssnano({zindex: false, reduceIdents: false})
  ]))     
  .pipe(gulp.dest(cssDest));   
});


gulp.task('liveAlert', function (ok) {
  liveAlert.close();
  liveAlert.reloadNotification();
  liveAlert.resetError();
  ok();
});


function onError(err){
  if(liveAlert.hasError() === false){
    if(err.plugin === 'gulp-sass'){
      // Without using the formatter
      liveAlert.open([
        { label: 'File', message: err.file },
        { label: 'Message', message: err.message }
      ]);
    }
  }

  this.emit('end');
}


gulp.task('watch', function () {
  liveAlert.run();

  gulp.watch(cssWatch, gulp.series('css', 'liveAlert'));
});


gulp.task('w', gulp.series('watch', 'css'));